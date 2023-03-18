import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviewer_name: { type: String, required: [true, 'Reviewer name is required'] },
    reviewer_rating: { type: Number, required: [true, 'Reviewer rating is required'] },
    reviewer_comment: { type: String, required: [true, 'Reviewer comment is required'] },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'userData'
    },
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'userData'
    },
    product_name: {
        type: String,
        required: [true, 'Product name is required']
    },
    product_image: {
        image_url: {
            type: String,
            required: [true, 'image url is required for product image']
        },
        public_id: {
            type: String,
            required: [true, 'public id is required form product image'],
        },
    },
    product_brand: {
        type: String,
        required: [true, 'Product brand is required']
    },
    product_category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    product_description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    product_avg_rating: {
        type: Number,
        //required: [true, 'Product average rating is required'],
        default: 0
    },
    product_reviews: [reviewSchema],
    number_of_reviews: {
        type: Number,
        //required: [true, 'Number of veriews is required'],
        default: 0
    },
    product_price: {
        type: Number,
        required: [true, 'Product price is required'],
        default: 0
    },
    product_stock_count: {
        type: Number,
        required: [true, 'Product stock count is required'],
        default: 0
    }
}, {
    timestamps: true
})

const productData = mongoose.model('productData', productSchema, 'productData');

export default productData;