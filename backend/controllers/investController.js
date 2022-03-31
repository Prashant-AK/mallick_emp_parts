import asyncHandler from 'express-async-handler'
import Invest from '../models/investment.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getInvest = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Invest.countDocuments({ ...keyword })
  const invest = await Invest.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ invest, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getInvestById = asyncHandler(async (req, res) => {
  const invest = await Invest.findById(req.params.id)

  if (invest) {
    res.json(invest)
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteInvest = asyncHandler(async (req, res) => {
  const invest = await Invest.findById(req.params.id)

  if (invest) {
    await invest.remove()
    res.json({ message: 'Manager removed' })
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createInvest = asyncHandler(async (req, res) => {
  const invest = new Invest({
    name: 'Sample name',
    image: "",
    user: req.user._id,
    contact:'',
    schedule:'',
    u1:'',
    u2:'',
    u3:'',
    u4:'',
    u5:'',
    u6:'',
    u7:'',
    u8:'',

  })

  const createdInvest = await invest.save()
  res.status(201).json(createdInvest)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateInvest = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    contact,
    schedule,
    u1,
    u2,
    u3,
    u4,
    u5,
    u6,
    u7,
    u8,
  } = req.body

  const invest = await Invest.findById(req.params.id)

  if (invest) {
    invest.name = name
    invest.image = image
    invest.contact = contact
    invest.schedule = schedule
    invest.u1 = u1
    invest.u2 = u2
    invest.u3 = u3
    invest.u4 = u4
    invest.u5 = u5
    invest.u6 = u6
    invest.u7 = u7
    invest.u8 = u8
    

    const updatedInvest = await invest.save()
    res.json(updatedInvest)
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createInvestReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const invest = await Invest.findById(req.params.id)

  if (invest) {
    const alreadyReviewed = invest.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    invest.reviews.push(review)

    invest.numReviews = invest.reviews.length

    invest.rating =
      invest.reviews.reduce((acc, item) => item.rating + acc, 0) /
      invest.reviews.length

    await invest.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopInvest = asyncHandler(async (req, res) => {
  const invest = await Invest.find({}).sort({ rating: -1 }).limit(3)

  res.json(invest)
})

export {
  getInvest,
  getInvestById,
  deleteInvest,
  createInvest,
  updateInvest,
  createInvestReview,
  getTopInvest,
}
