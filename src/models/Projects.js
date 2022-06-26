import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  members: [
    {
      name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee',
      },
      role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
      rate: { type: Number, required: true },
    },
  ],
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },
  client: { type: String, required: true },
});

export default mongoose.model('Project', projectSchema);
