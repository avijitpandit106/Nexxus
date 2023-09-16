const { model, Schema } = require("mongoose");

let warningSchema = new Schema({
  GuildID: String,
  UserId: String,
  Username: String,
  Content: Array,
});

module.exports = model("Warnings", warningSchema);
