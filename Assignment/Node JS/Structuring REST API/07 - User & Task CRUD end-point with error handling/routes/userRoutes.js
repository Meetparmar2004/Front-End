const express = require("express");

const router = express.Router();

let users = [
  { id: 1, name: "Riya", email: "riya@gmail.com" },
  { id: 2, name: "Aman", email: "aman@gmail.com" },
];

// AI generated snippet (ChatGPT):
//
// app.delete("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const index = users.findIndex((user) => user.id == id);
//   if (index === -1) {
//     return res.status(404).send("User not found");
//   }
//   users.splice(index, 1);
//   res.send("User deleted");
// });
//
// Changes I made so it fits this app:
// 1. Put it in userRoutes.js. app.js already adds /api/users, so the path here is only /:id.
// 2. Used Number(id) because our user ids are numbers, not strings.
// 3. Sent JSON instead of plain text, with a success message and an error message.

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "User deleted" });
});

module.exports = router;
