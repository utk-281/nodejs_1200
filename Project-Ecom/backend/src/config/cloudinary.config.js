import { v2 } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default v2;
/* 
{
  asset_id: '9baf3ff24e86fee61971b478cd6882f0',
  public_id: 'eKart/o4rp2y3djoiyriisif7s',
  version: 1757317606,
  version_id: '0d4b8034e0cbbeab3d2833bb583ce9ac',
  signature: '75a97c2e4de2c5d99dfda6f2f46888a5175adc65',
  width: 263,
  height: 192,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2025-09-08T07:46:46Z',
  tags: [],
  bytes: 9241,
  type: 'upload',
  etag: '7efa8dae9fc6da37e40f6e79e938eb87',
  placeholder: false,
  url: 'http://res.cloudinary.com/dynuatcqe/image/upload/v1757317606/eKart/o4rp2y3djoiyriisif7s.jpg',
  secure_url: 'https://res.cloudinary.com/dynuatcqe/image/upload/v1757317606/eKart/o4rp2y3djoiyriisif7s.jpg',  
  asset_folder: 'eKart',
  display_name: 'o4rp2y3djoiyriisif7s',
  original_filename: '1757317604538-----images',
  api_key: '563591294697372'
}

*/
