import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const riderSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
});

export default model('Rider', riderSchema);
