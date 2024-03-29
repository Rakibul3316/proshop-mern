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

// @desc        Update order to paid
// @route       GET /api/orders/:id/pay
// @access      Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await orderData.findById({ '_id': req.params.id })

    if (order) {
        order.isPaid = true
        order.paid_at = Date.now()
        // order.paymentResult = {
        //     id: req.body.id,
        //     status: req.body.status,
        //     update_time: req.body.update_time,
        //     email_address: req.body.payer.email_address
        // }

        const updatedOrder = await order.save()

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc        Update order to delivered
// @route       GET /api/orders/:id/deliver
// @access      Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await orderData.findById({ '_id': req.params.id })

    if (order) {
        order.isDelivered = true
        order.delivered_at = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc        Get logged in user orders
// @route       GET /api/orders/myorders
// @access      Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderData.find({ 'user_id': req.user._id })

    res.json(orders);
})

// @desc        Get all orders
// @route       GET /api/orders
// @access      Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await orderData.find({}).populate('user_id', 'id name')

    res.json(orders);
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
}