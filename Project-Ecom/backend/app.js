// npm i express mongoose dotenv express-async-handler bcryptjs cookie-parser jsonwebtoken joi cloudinary multer

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import { seedAdmin } from './src/seed/admin.seed.js';

dotenv.config();

// console.log(process.argv);

if (process.argv[2] === 'seedAdmin') {
  seedAdmin();
}

import error from './src/middlewares/error.middleware.js';

import { authenticate, authorize } from './src/middlewares/auth.middleware.js';

import adminOrderRoutes from './src/routes/admin/order.route.js';
import adminProductRoutes from './src/routes/admin/product.route.js';
import shopAddressRoutes from './src/routes/shop/address.route.js';
import shopCartRoutes from './src/routes/shop/cart.route.js';
import shopOrderRoutes from './src/routes/shop/order.route.js';
import shopProductRoutes from './src/routes/shop/product.route.js';
import userRoutes from './src/routes/user/user.route.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// html data -> qs, query-string (by default it is set to false)

app.use('/api/users', userRoutes);
app.use('/api/shop/addresses', authenticate, shopAddressRoutes);
app.use('/api/admin/products', authenticate, authorize, adminProductRoutes);
app.use('/api/shop/products', shopProductRoutes);
app.use('/api/shop/cart', authenticate, shopCartRoutes);
app.use('/api/shop/orders', authenticate, shopOrderRoutes);
app.use('/api/admin/orders', authenticate, authorize, adminOrderRoutes);

app.use(error);

export default app;
