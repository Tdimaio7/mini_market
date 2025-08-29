import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

const productSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;