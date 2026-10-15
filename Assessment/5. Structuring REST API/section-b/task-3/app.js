const express = require("express");
const menuRoutes = require("./routes/menu");

const app = express();
const PORT = 3002;

app.use(express.json());
app.use("/api/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("Task 3 server running on http://localhost:" + PORT);
});
