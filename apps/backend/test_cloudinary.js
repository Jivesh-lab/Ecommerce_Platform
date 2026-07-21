const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim().replace(/x$/, ''),
  secure: true
});

async function testUpload() {
  try {
    console.log("Secret length:", process.env.CLOUDINARY_API_SECRET?.length);
    console.log("Secret raw string:", JSON.stringify(process.env.CLOUDINARY_API_SECRET));
    
    const dataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const res = await cloudinary.uploader.upload(dataUri, {
      folder: "bacoola",
      public_id: "test-upload-" + Date.now(),
      resource_type: "auto",
      overwrite: false,
      unique_filename: false,
      use_filename: false,
    });
    console.log("Success:", res.secure_url);
  } catch (e) {
    console.error("Cloudinary Error:", e.message);
  }
}

testUpload();
