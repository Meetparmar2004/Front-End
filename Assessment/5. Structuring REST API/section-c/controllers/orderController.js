const orders = [];
let nextOrderId = 1;

function getAll(req, res) {
  const mine = orders.filter((order) => order.customerId === req.user.id);
  res.status(200).json(mine);
}

function create(req, res) {
  const { restaurantId, items } = req.body;

  if (!restaurantId) {
    return res.status(400).json({ error: true, message: "restaurantId is required" });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: true, message: "items must have at least one item" });
  }

  const order = {
    id: nextOrderId,
    customerId: req.user.id,
    restaurantId,
    items,
    status: "placed",
  };
  nextOrderId += 1;
  orders.push(order);

  res.status(201).json(order);
}

module.exports = { getAll, create };
