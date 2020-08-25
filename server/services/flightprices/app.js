const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`flightPrices application listening on port ${port}`);
});

// module.exports = app
