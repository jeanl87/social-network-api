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

  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
