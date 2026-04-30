import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
