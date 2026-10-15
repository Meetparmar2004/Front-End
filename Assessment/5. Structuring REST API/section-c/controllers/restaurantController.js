const restaurants = [
  { id: 1, name: "Spice Hub", cuisine: "indian", image: null, menu: [] },
];
let nextId = 2;

function getAll(req, res) {
  res.status(200).json(restaurants);
}

function getById(req, res) {
  const restaurant = restaurants.find((item) => item.id === Number(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ error: true, message: "Restaurant not found" });
  }
  res.status(200).json(restaurant);
}

function create(req, res) {
  const { name, cuisine } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: true, message: "name is required" });
  }
  if (typeof cuisine !== "string" || cuisine.trim() === "") {
    return res.status(400).json({ error: true, message: "cuisine is required" });
  }

  const restaurant = {
    id: nextId,
    name: name.trim(),
    cuisine: cuisine.trim(),
    image: null,
    menu: [],
  };
  nextId += 1;
  restaurants.push(restaurant);

  res.status(201).json(restaurant);
}

function update(req, res) {
  const restaurant = restaurants.find((item) => item.id === Number(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ error: true, message: "Restaurant not found" });
  }

  if (req.body.name !== undefined) {
    if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
      return res.status(400).json({ error: true, message: "name must be a string" });
    }
    restaurant.name = req.body.name.trim();
  }

  if (req.body.cuisine !== undefined) {
    if (typeof req.body.cuisine !== "string" || req.body.cuisine.trim() === "") {
      return res.status(400).json({ error: true, message: "cuisine must be a string" });
    }
    restaurant.cuisine = req.body.cuisine.trim();
  }

  res.status(200).json(restaurant);
}

function remove(req, res) {
  const index = restaurants.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: true, message: "Restaurant not found" });
  }

  const deleted = restaurants.splice(index, 1)[0];
  res.status(200).json(deleted);
}

function addMenuItem(req, res) {
  const restaurant = restaurants.find((item) => item.id === Number(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ error: true, message: "Restaurant not found" });
  }

  const errors = {};
  if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
    errors.name = "name is required";
  }
  if (typeof req.body.price !== "number" || req.body.price <= 0) {
    errors.price = "price must be a positive number";
  }
  if (typeof req.body.category !== "string" || req.body.category.trim() === "") {
    errors.category = "category is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: true, message: "Validation failed", errors });
  }

  const menuItem = {
    id: restaurant.menu.length + 1,
    name: req.body.name.trim(),
    price: req.body.price,
    category: req.body.category.trim(),
  };
  restaurant.menu.push(menuItem);

  res.status(201).json(menuItem);
}

function saveImage(req, res) {
  const restaurant = restaurants.find((item) => item.id === Number(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ error: true, message: "Restaurant not found" });
  }

  restaurant.image = req.file.filename;
  res.status(200).json({ message: "Image uploaded", file: req.file.filename });
}

module.exports = { getAll, getById, create, update, remove, addMenuItem, saveImage };
