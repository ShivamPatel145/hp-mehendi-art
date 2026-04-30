import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  }
}, { timestamps: true });

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
