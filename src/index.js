const express = require("express");
const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const bidRoutes = require("./routes/bidRoutes");
const setupWebSocket = require("./websocket/notificationSocket");

const app = express();


app.use(express.json());
app.use("/users", authRoutes);
app.use("/items", itemRoutes);
app.use("/notification", notificationRoutes)
app.use('/items', bidRoutes)


const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  console.log(`server running on port ${port} `);
  await sequelize.sync();
});

setupWebSocket(server);
