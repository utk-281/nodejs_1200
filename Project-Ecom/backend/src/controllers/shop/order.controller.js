import expressAsyncHandler from 'express-async-handler';
import paypal from '../../config/paypal.config.js';
import Address from '../../models/address.model.js';
import Cart from '../../models/cart.model.js';
import Order from '../../models/order.model.js';
import Product from '../../models/product.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';
import CustomError from '../../utils/CustomError.util.js';

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let { paymentMethod, cartId, addressId } = req.body;

  let cart = await Cart.findOne({ _id: cartId, userId });
  if (!cart || cart.products.length === 0) return next(new CustomError('Cart not found', 404));

  let address = await Address.findOne({ _id: addressId, userId });
  if (!address) return next(new CustomError('Address not found', 404));

  let addressObject = {
    addressId: address._id,
    address: address.address,
    city: address.city,
    pinCode: address.pinCode,
    phone: address.phone,
    notes: address.notes,
  };

  let totalAmount = 0;
  let cartItems = [];

  for (let item of cart.products) {
    let product = await Product.findById(item.productId);
    if (!product) return next(new CustomError('Product not found', 404));

    totalAmount += product.price * item.quantity;

    cartItems.push({
      image: product.image,
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      quantity: item.quantity,
      productId: product._id,
    });
  }

  if (paymentMethod === 'Online') {
    let create_payment_json = {
      intent: 'sale', // "sale",
      redirect_urls: {
        cancel_url: 'http://localhost:9000/failed',
        return_url: 'http://localhost:9000/api/shop/orders/capture',
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => {
              return {
                name: item.title,
                sku: item._id, // stock keeping unit --> it acts as unique id for paypal
                price: item.price.toFixed(2),
                currency: 'USD',
                quantity: item.quantity,
              };
            }),
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2),
          },
          description: 'Order Payment',
        },
      ],
      payer: {
        payment_method: 'paypal',
      },
    };

    paypal.payment.create(create_payment_json, async (err, payment) => {
      if (err) return next(new CustomError(err.message, 500));

      let redirectUrlObject = payment.links.find((link) => {
        return link.rel === 'approval_url';
      });

      let redirectUrl = redirectUrlObject.href;

      let order = await Order.create({
        userId,
        cartId,
        cartItems,
        addressInfo: addressObject,
        paymentMethod,
        totalAmount,
        paymentId: payment.id,
      });
      new ApiResponse(201, 'Order created successfully', true, redirectUrl, order).send(res);
    });
  } else {
    // cod
    let order = await Order.create({
      userId,
      cartId,
      cartItems,
      addressInfo: addressObject,
      paymentMethod,
      totalAmount,
    });
    new ApiResponse(201, 'Order created successfully', order).send(res);
  }
});

export const captureOrder = expressAsyncHandler(async (req, res, next) => {
  let { paymentId, PayerID } = req.query;

  paypal.payment.execute(paymentId, { payer_id: PayerID }, async (err, payment) => {
    if (err) return next(new CustomError('Payment failed', 500));
    let order = await Order.findOne({ paymentId });
    if (!order) return next(new CustomError('Order not found', 404));

    if (payment.state === 'approved') {
      order.orderStatus = 'Processing';
      order.paymentStatus = 'Paid';
      order.payerId = PayerID;
      await order.save();

      for (let item of order.cartItems) {
        let prod = await Product.findById(item.productId);
        prod.totalStock -= item.quantity;
        await prod.save();
      }

      let cart = await Cart.findOne({ _id: order.cartId });
      cart.products = [];
      await cart.save();
    } else {
      order.orderStatus = 'Failed';
      order.paymentStatus = 'Failed';
      order.payerId = PayerID;
      await order.save();
    }

    new ApiResponse(200, 'Order captured successfully', order).send(res);
  });
});

export const getOrders = expressAsyncHandler(async (req, res) => {
  let userId = req.myUser._id;
  let orders = await Order.find({ userId });
  if (orders.length === 0) return next(new CustomError('No orders found', 404));
  new ApiResponse(200, 'Orders fetched successfully', true, orders).send(res);
});

export const getOrder = expressAsyncHandler(async (req, res) => {
  let userId = req.myUser._id;
  let id = req.params.id;
  let order = await Order.findOne({ userId, _id: id });
  if (!order) return next(new CustomError('No order found', 404));
  new ApiResponse(200, 'Order fetched successfully', true, order).send(res);
});
