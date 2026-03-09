
import mongoose from "mongoose";


export default async function connection() {

  try {
    await mongoose.connect(process.env.MONGO_URL).then((resp) => {
      console.log("data base connected")
    })


  } catch (error) {
    console.log(error, "data base error")
  }
}