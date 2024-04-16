const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require('./middleware/errorHandler');
const mongoose = require("mongoose");
const cors=require("cors")
const path = require("path");
const cookieParser = require('cookie-parser')

const app = express();
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/api/categorys', require("./routers/categoryRouter"));
app.use('/api/products', require('./routers/productRouter'));
app.use('/api/users', require('./routers/userRouter'));
app.use('/api/admin', require("./routers/adminRouter"));
app.use('/api/order', require('./routers/orderRouter'));
app.use('/api/cart', require("./routers/cartRouter"));
app.use('/api/stripe', require('./routers/paymentRouter'));
app.use("/uploads", express.static(path.resolve(__dirname, 'uploads')));

app.use(errorHandler);


mongoose
  .connect(URL)
  .then(() => {
    console.log("mongo connected successfully");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

