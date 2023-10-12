
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
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
    year: { type: Number, required: true},
    availability: {
      type: Boolean,
      default: true
    },
  }
);

 const Car = mongoose.models.Car || mongoose.model('Car', carSchema);
  //const Car = mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);

export default Car;

