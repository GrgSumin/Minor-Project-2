const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const { ORDER_STATUSES } = require("../models/Order");
const Product = require("../models/Product");
const { sendMail } = require("../services/mailer");
const { orderNotificationHtml, orderConfirmationHtml } = require("../services/emailTemplates");

const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, shipping = 0 } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("No items in order");
  }
  if (
    !shippingAddress ||
    !shippingAddress.fullName ||
    !shippingAddress.phone ||
    !shippingAddress.address ||
    !shippingAddress.city
  ) {
    res.status(400);
    throw new Error("Shipping address incomplete");
  }

  const productIds = items.map((i) => i.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const byId = Object.fromEntries(products.map((p) => [p._id.toString(), p]));

  const orderItems = items.map((i) => {
    const p = byId[i.product];
    if (!p) {
      res.status(400);
      throw new Error(`Product ${i.product} not found`);
    }
    const qty = Math.max(1, Number(i.quantity) || 1);
    return {
      product: p._id,
      title: p.title,
      image: p.image,
      price: p.price,
      quantity: qty,
    };
  });

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + Number(shipping);

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    subtotal,
    shipping: Number(shipping),
    total,
    shippingAddress,
  });

  // Decrement stock (best-effort)
  await Promise.all(
    orderItems.map((i) =>
      Product.updateOne({ _id: i.product, stock: { $gte: i.quantity } }, { $inc: { stock: -i.quantity } })
    )
  );

  // Fire-and-forget emails
  sendMail({
    to: process.env.OWNER_EMAIL,
    subject: `New order #${order._id.toString().slice(-8)} — Rs. ${order.total.toFixed(2)}`,
    html: orderNotificationHtml(order, req.user),
  }).catch((e) => console.error("owner email failed:", e.message));

  sendMail({
    to: req.user.email,
    subject: `Order confirmation — InstrumentMania`,
    html: orderConfirmationHtml(order, req.user),
  }).catch((e) => console.error("customer email failed:", e.message));

  res.status(201).json(order);
});

const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  res.json(order);
});

const listAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!ORDER_STATUSES.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

module.exports = { createOrder, myOrders, getOrder, listAllOrders, updateStatus };
