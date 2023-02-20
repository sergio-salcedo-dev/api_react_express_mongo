import mongoose from "mongoose";

const Schema = mongoose.Schema;

const goalSchema = new Schema({
  isCompleted: {
    type: Schema.Types.Boolean,
    default: false,
  },
  text: String,
});

const GoalModel = mongoose.model("Goal", goalSchema);

export default GoalModel;
