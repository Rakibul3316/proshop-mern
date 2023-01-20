import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'userData'
    },
    order_items: [
        {
            product_name: { type: String, required: [true, 'Order product name is required'] },
            product_quantity: { type: String, required: [true, 'Order product qty is required'] },
            product_image: { type: String, required: [true, 'Order product image is required'] },
            product_price: { type: Number, required: [true, 'Order product price is required'] },
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, 'Order product id is required'],
                ref: 'productData'
            }
        }
    ],
    shipping_address: {
        address: { type: String, required: [true, 'Shipping address is required'] },
        city: { type: String, required: [true, 'Shipping city is required'] },
        postal_code: { type: String, required: [true, 'Shipping postal code is required'] },
        country: { type: String, required: [true, 'Shipping country is required'] },
    },
    payment_method: {
        type: String,
        required: [true, 'Payment method is required']
    },
    payment_address: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    tax_price: {
        type: Number,
        required: [true, 'Tax price is required'],
        default: 0
    },
    shipping_price: {
        type: Number,
        required: [true, 'Shipping price is required'],
        default: 0
    },
    total_price: {
        type: Number,
        required: [true, 'Total price is required'],
        default: 0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paid_at: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    delivered_at: {
        type: Date
    }
}, {
    timestamps: true
})

const orderData = mongoose.model('orderData', orderSchema, 'orderData');

export default orderData;