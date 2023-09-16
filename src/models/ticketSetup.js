const { model, Schema } = require("mongoose");

let ticketSetup = new Schema({
  Guild: String,
  Channel: String,
  Parent: String,
  Handler: String,
  TicketID: String,
});

module.exports = model("TicketSetup", ticketSetup);
