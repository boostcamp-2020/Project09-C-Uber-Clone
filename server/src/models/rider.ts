import mongoose, { Document } from 'mongoose';
const { Schema, model } = mongoose;

interface riderInterface {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
}

const riderSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
});

export default model<riderInterface & Document>('Rider', riderSchema);
