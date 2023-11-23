import mongoose from 'mongoose';

const carbookSchema = new mongoose.Schema(
  {
    location: Number,
    pickupDateTime: Date,
    rate : Number,
    no_days : Number,
    total_amount: Number,
    full_name: String,
    contact_no: String,
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    isComplete:{
      type: Boolean,
      default: false,
    },
    userID: {
      type: String,
      versionKey: false,
    },
    card_number: String,
    checkoutId: String,
    expiry: {
      type: Date,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
  }
);

 const CarBook = mongoose.models.CarBook || mongoose.model('CarBook', carbookSchema);

export default CarBook;
