import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a team name'],
  },
  description: {
    type: String,
    default: '',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Team', teamSchema);
