import mongoose from "mongoose";

export async function initMongoDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error)
  }
}

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
})
