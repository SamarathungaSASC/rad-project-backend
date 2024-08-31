const { Schema, model } = require("mongoose");

const bloodStockSchema = new Schema({
  bloodGroup: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});
const BloodStock = model("BloodStock", bloodStockSchema);

module.exports = BloodStock;
