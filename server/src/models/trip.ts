import mongoose, { Document } from 'mongoose';
const { Schema, model } = mongoose;

interface Place {
  address: string;
  latitude: number;
  longitude: number;
}

interface Driver {
  _id: string;
  email: string;
  name: string;
  carType: string;
  plateNumber: string;
  description?: string;
  profileImage?: string;
}

interface Rider {
  _id: string;
  email: string;
  name: string;
}

interface TripInterface {
  _id: string
  origin: Place;
  destination: Place;
  startTime: Date;
  arrivalTime?: Date;
  status: 'open' | 'matched' | 'onBoard' | 'close' | 'cancel';
  distance?: number;
  driver?: Driver;
  rider: Rider;
}

const tripSchema = new Schema({
  origin: {
    type: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  },
  destination: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  startTime: { type: Date, required: true },
  arrivalTime: Date,
  status: { type: String, required: true },
  distance: Number,
  rider: {
    type: {
      _id: String,
      email: String,
      name: String,
    },
    required: true,
  },
  driver: {
    _id: String,
    email: String,
    name: String,
    carType: String,
    plateNumber: String,
    description: String,
    profileImage: String,
  },
});

export default model<TripInterface & Document>('Trip', tripSchema);
