const Orders = require("../model/Order");

const makeOrder = async (req, res) => {
  const { userID, cartItems, totalAmount, expectedTime } = req.body;
  try {
    const newOrderItem = new Orders({
      user: userID,
      cartItems,
      totalAmount,
      orderDate: Date.now(),
      expectedTime,
    });

    await newOrderItem.save();

    res.json({
      message: "Order made successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrder = async (req, res) => {
  const { orderID } = req.body;
  try {
    const orderItem = await Orders.findById(orderID);

    if (!orderItem) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getallOrders = async (req, res) => {
  try {
    const orderItems = await Orders.find();
    res.status(200).json(orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "isuuse created" });
  }
};
const cancelOrder = async (req, res) => {
  const { orderID } = req.body;
  try {
    orderItem = await Orders.findById(orderID);

    if (!orderItem) {
      return res.status(200).json({ error: "Order not found" });
    }

    orderItem.status = "cancelled";

    orderItem.save();

    res.json({ message: "Order cancelled!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getOrder, getallOrders, makeOrder, cancelOrder };
