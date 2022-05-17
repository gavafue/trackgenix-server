import mongoose from 'mongoose';

const superAdminsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const SuperAdmins = mongoose.model('SuperAdmins', superAdminsSchema);
export default SuperAdmins;
