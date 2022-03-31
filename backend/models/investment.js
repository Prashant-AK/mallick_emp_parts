import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const investSchema = mongoose.Schema(
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
    image: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    schedule:{
      type: String,
      required: false,
    },
    u1: {
      type: String,
      required: false,
    },
    u2: {
        type: String,
        required: false,
    },
    u3: {
        type: String,
        required: false,
    },
    u4: {
          type: String,
          required: false,
    },
    u5: {
        type: String,
        required: false,
    },
    u6: {
          type: String,
          required: false,
    },
    u7: {
          type: String,
          required: false,
    },
    u8: {
            type: String,
            required: false,
    },  
    
  },
  {
    timestamps: true,
  }
)

const Invest = mongoose.model('Invest', investSchema)

export default Invest
