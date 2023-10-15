import mongoose from 'mongoose';

const carbookSchema = new mongoose.Schema(
  {
    location: Number,
    pickupDateTime: Date,
    no_days : Number,
    total_amount: Number,
    full_name: String,
    contact_no: String,
    carId: String,
    // carId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Car",
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

 const CarBook = mongoose.models.CarBook || mongoose.model('CarBook', carbookSchema);

export default CarBook;
