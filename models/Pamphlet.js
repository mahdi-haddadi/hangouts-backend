const mongoose = require("mongoose");

const PamphletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: Array,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  //   hangout:{
  //     type:String,
  //     required:true
  //   }
});
const Pamphlet = mongoose.model("Pamphlet", PamphletSchema);
module.exports = Pamphlet;
