import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
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

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    video:'',
    location:'',
    air:'',
    rail:'',
    high:'',
    why_invest1:'',
    why_invest2:'',
    why_invest3:'',
    overview:'',
    tenancy:'',
    floor:'',
    resources:'',
    image: '/images/sample.jpg',
    image1: '/images/sample.jpg',
    image2: '/images/sample.jpg',
    image3: '/images/sample.jpg',
    image4: '/images/sample.jpg',
    plan: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    type: 'INVEST',
    ready: 'READY',
    min: 0,
    funded:0,
    ut:0,

  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    image1,
    image2,
    image3,
    image4,
    plan,
    brand,
    category,
    video,
    location,
    air,
    rail,
    high,
    why_invest1,
    why_invest2,
    why_invest3,
    overview,
    tenancy,
    floor,
    resources,
    min,
    vr,
    ut,
    funded,
    type,
    ready,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.image1 = image1
    product.image2 = image2
    product.image3 = image3
    product.image4 = image4
    product.plan = plan
    product.brand = brand
    product.category = category
    product.video = video
    product.location = location
    product.why_invest1 = why_invest1
    product.why_invest2 = why_invest2
    product.why_invest3 = why_invest3
    product.overview = overview
    product.tenancy = tenancy
    product.floor = floor
    product.resources = resources
    product.min = min
    product.type = type
    product.ready = ready
    product.vr = vr
    product.ut = ut
    product.funded = funded
    product.air = air
    product.rail = rail
    product.high = high


    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
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

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
