import mongoose, { Schema, Document } from 'mongoose';

export interface IRashi extends Document {
  name: string;
  nameNepali?: string;
  description: string;
  favoriteColor: string;
  favoriteNumber: number;
  icon: string; // Icon name or emoji
  sevenDaysDescription?: string;
  oneMonthDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RashiSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nameNepali: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    favoriteColor: {
      type: String,
      required: true,
    },
    favoriteNumber: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    sevenDaysDescription: {
      type: String,
    },
    oneMonthDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rashi = mongoose.models.Rashi || mongoose.model<IRashi>('Rashi', RashiSchema);

export default Rashi;
