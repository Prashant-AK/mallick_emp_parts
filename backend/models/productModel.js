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

const productSchema = mongoose.Schema(
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
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    image4: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    video:{
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    air: {
      type: String,
      required: false,
    },
    rail: {
      type: String,
      required: false,
    },
    high: {
      type: String,
      required: false,
    },
    why_invest1: {
      type: String,
      required: false,
    },
    why_invest2: {
      type: String,
      required: false,
    },
    why_invest3: {
      type: String,
      required: false,
    },
    overview: {
      type: String,
      required: false,
    },
    tenancy:{
      type: String,
      required: false,
    },
    floor: {
      type: String,
      required: false,
    },
    resources: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      default: 0,
    },
    ready: {
      type: String,
      required: true,
      default: 0,
    },
    min: {
      type: Number,
      required: true,
      default: 0,
    },
    vr: {
      type: String,
      required: true,
      default: 0,
    },
    ut: {
      type: String,
      required: true,
      default: 0,
    },
    funded: {
      type: String,
      required: true,
      default: 0,
    },
    
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
