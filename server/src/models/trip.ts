import { ObjectID } from 'mongodb';
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
  description: string;
  profileImage: string;
}

interface Rider {
  _id: string;
  email: string;
  name: string;
}

interface TripInterface {
  origin: Place;
  destination: Place;
  startTime: Date;
  arrivalTime: Date;
  status: 'open' | 'matched' | 'close' | 'cancel';
  distance: number;
  driver: Driver;
  rider: Rider;
}

const tripSchema = new Schema({
  origin: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  destination: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  startTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  status: { type: String, required: true },
  distance: Number,
  rider: {
    _id: { type: ObjectID, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  driver: {
    _id: ObjectID,
    email: String,
    name: String,
    carType: String,
    plateNumber: String,
    description: String,
    profileImage: String,
  },
});

export default model<TripInterface & Document>('Trip', tripSchema);
