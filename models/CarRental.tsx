import mongoose, { Schema } from "mongoose";

const carRentalSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const CarRental = mongoose.models.Topic || mongoose.model("CarRental", carRentalSchema);

export default CarRental;