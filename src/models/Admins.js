import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['female', 'male', 'other'],
  },
  phone: {
    type: String,
    required: true,
  },
  dateBirth: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Admin', adminSchema);
