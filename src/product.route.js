const express = require("express");
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

const productModel = require("./product");
const app = express();

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('product_image')

app.get("/products", async (request, response) => {
  const products = await productModel.find({});

  try {
    response.send(products);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/products",upload,async (request, response) => {
   console.log('-----------------');
    try {
        console.log(request.body);
        let myFile = request.file.originalname.split(".")
        const fileType = myFile[myFile.length - 1]
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME || "asproductstorage",
            Key: `${uuid()}.${fileType}`,
            Body: request.file.buffer
        }

        s3.upload(params, async(error, data) => {
            if(error){
                response.status(500).send(error)
              }
              const product_value = {
                  product_name:request.body.product_name,
                  product_image:data.Location
              }
          const product = new productModel(product_value);
            let saved_data = await product.save();
            response.status(200).send(saved_data);
            // response.send(data)
        })
      // response.send(params);
    } catch (error) {
        console.log(error);
      response.status(500).send(error);
    }
  });

module.exports = app;

// {
//     "ETag": "\"120e0e822d51d8178584afcaaae43997\"",
//     "Location": "https://asproductstorage.s3.us-east-2.amazonaws.com/298f1885-2410-4624-8d48-6b4baeb88a60.jpg",
//     "key": "298f1885-2410-4624-8d48-6b4baeb88a60.jpg",
//     "Key": "298f1885-2410-4624-8d48-6b4baeb88a60.jpg",
//     "Bucket": "asproductstorage"
// }