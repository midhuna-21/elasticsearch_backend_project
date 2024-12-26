import dotenv from 'dotenv';
dotenv.config()

export default {
   PORT:process.env.PORT,
   MONGO_URI:process.env.MONGO_URI,
   EMAIL:process.env.EMAIL, 
   APP_PASSWORD:process.env.APP_PASSWORD,
   JWT_SECRET: process.env.JWT_SECRET,
   API:process.env.API,
   BUCKET_REGION:process.env.BUCKET_REGION,
   BUCKET_NAME:process.env.BUCKET_NAME,
   ACCESS_KEY:process.env.ACCESS_KEY,
   SECRET_ACCESS_KEY:process.env.SECRET_ACCESS_KEY,
   CLOUD_ID:process.env.CLOUD_ID,
   USER_NAME:process.env.USER_NAME,
   ELASTIC_PASSWORD:process.env.ELASTIC_PASSWORD,
   ELASTIC_API_KEY:process.env.ELASTIC_API_KEY
}  