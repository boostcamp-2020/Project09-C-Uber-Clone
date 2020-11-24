import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const driverSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  carType: { type: String, required: true },
  plateNumber: { type: String, unique: true, required: true },
  description: String,
  profileImage: String,
});

export default model('Driver', driverSchema);
