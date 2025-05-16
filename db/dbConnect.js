import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
    //   console.log(data);
      console.log("DB successfully connected...");
    })
    .catch(() => {
      console.log("DB successfully connected...");
    });
};

export default dbConnect;
