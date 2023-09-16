const { model, Schema } = require("mongoose");

let reportSchema = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("ReportSystem", reportSchema);
