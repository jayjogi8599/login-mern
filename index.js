const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://jayjogi8599:inotebook@cluster0.eksdx8m.mongodb.net/"
  );
  console.log("DB connected Successfully");
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post("/demo",async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

app.get('/demo', async (req,res)=>{
const doc = await User.find({})
res.json(doc)
})
app.listen(3000, () => {
  console.log("Server is Running");
});
