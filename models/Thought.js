const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const ThoughtSchema = new Schema({
  thoughttext: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
