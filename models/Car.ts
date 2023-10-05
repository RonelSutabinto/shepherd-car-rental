import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICar extends Document {
  city_mpg: number,
  color: string,
  fuel_type: string,
  highway_mpg: number,
  idLocation: string,
  make: string,
  mileage: number,
  model: string,
  rentRate: number,
  seats: number,
  transmission: string,
  year: number,
  availability: boolean;
}

const carSchema: Schema = new Schema({
  city_mpg: Number,
  color: String,
  fuel_type: String,
  highway_mpg: Number,
  idLocation: String,
  make: { type: String, required: true },
  mileage: Number,
  model: {type: String, required: true},
  rentRate: Number,
  seats: Number,
  transmission: String,
  year: { type: Number, rewuired: true},
  availability: Boolean,
});

let Car: Model<ICar>;

if (mongoose.models.Car) {
  // Reuse existing model to prevent overwrite
  Car = mongoose.models.Car as Model<ICar>;
} else {
  // Create and export the model if it doesn't exist
  Car = mongoose.model<ICar>('Car', carSchema);
}

export default Car;









// import mongoose, { Schema } from "mongoose";

// const carListSchema = new Schema(
//   {
//     city_mpg: Number,
//     color: String,
//     fuel_type: String,
//     highway_mpg: Number,
//     idLocation: String,
//     make: {type: String, required: true},
//     mileage: Number,
//     model: {type: String, required: true},
//     rentRate: Number,
//     seats: Number,
//     transmission: String,
//     year: Number
//   },
//   {
//     timestamps: true,
//   }
// );

// const CarList = mongoose.models.CarList || mongoose.model("CarList", carListSchema);

// export default CarList;