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
    carId: String,
    isComplete:{
      type: Boolean,
      default: false,
    },
    card_type: String,
    card_number: String,
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
