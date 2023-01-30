import asyncHandler from 'express-async-handler';
import orderData from '../models/orderModel.js';

// @desc        Create new order
// @route       GET /api/orders
// @access      Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, taxPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items');
    } else {
        const order = new orderData({
            order_items: orderItems,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            items_price: itemsPrice,
            shipping_price: shippingPrice,
            total_price: totalPrice,
            user_id: req.user._id,
            tax_price: taxPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder);
    }
})

// @desc        Create order by Id
// @route       GET /api/orders/:id
// @access      Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderData.findById({ '_id': req.params.id }).populate('user_id', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

export { addOrderItems, getOrderById }