import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
  },
  description: {
    type: String,
    default: '',
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active',
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Project', projectSchema);
