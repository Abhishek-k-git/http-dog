import mongoose from 'mongoose';

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    statusCodes: [{
      code: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', listSchema);

export default List;
