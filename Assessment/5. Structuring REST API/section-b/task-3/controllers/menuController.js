let menuItems = [
  { id: 1, name: "Paneer Tikka", price: 250, category: "starter" },
];
let nextId = 2;

function validateMenuItem(body) {
  const errors = [];

  if (typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("name is required and must be a string");
  }

  if (typeof body.price !== "number" || body.price <= 0) {
    errors.push("price must be a positive number");
  }

  if (typeof body.category !== "string" || body.category.trim() === "") {
    errors.push("category is required and must be a string");
  }

  return errors;
}

function getAll(req, res) {
  res.status(200).json(menuItems);
}

function getById(req, res) {
  const id = Number(req.params.id);
  const item = menuItems.find((menuItem) => menuItem.id === id);

  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.status(200).json(item);
}

function create(req, res) {
  const errors = validateMenuItem(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  const newItem = {
    id: nextId,
    name: req.body.name.trim(),
    price: req.body.price,
    category: req.body.category.trim(),
  };
  nextId += 1;
  menuItems.push(newItem);

  res.status(201).json(newItem);
}

function update(req, res) {
  const id = Number(req.params.id);
  const item = menuItems.find((menuItem) => menuItem.id === id);

  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const errors = validateMenuItem(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  item.name = req.body.name.trim();
  item.price = req.body.price;
  item.category = req.body.category.trim();

  res.status(200).json(item);
}

function remove(req, res) {
  const id = Number(req.params.id);
  const index = menuItems.findIndex((menuItem) => menuItem.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const deleted = menuItems.splice(index, 1)[0];
  res.status(200).json(deleted);
}

module.exports = { getAll, getById, create, update, remove };
