const express = require("express");
const PORT = 3000;
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to Todo");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
