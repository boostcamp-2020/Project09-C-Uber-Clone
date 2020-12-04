import mongoose, { Document } from 'mongoose';
const { Schema, model } = mongoose;

interface driverInterface {
  _id: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  carType: string;
  plateNumber: string;
  description?: string;
  profileImage?: string;
  latitude?: number;
  longitude?: number;
}

const driverSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  carType: { type: String, required: true },
  plateNumber: { type: String, unique: true, required: true },
  description: String,
  profileImage: String,
  latitude: Number,
  longitude: Number,
});

export default model<driverInterface & Document>('Driver', driverSchema);
