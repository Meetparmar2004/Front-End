const express = require("express");
const { router } = require("./movieRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.use((error, req, res, next) => {
  return res.status(500).json({
    error: error.message || "Internal server error",
    statusCode: 500
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`movie-booking-app listening on port ${port}`);
  });
}

module.exports = app;
