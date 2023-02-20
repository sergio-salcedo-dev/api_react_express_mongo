import mongoose from "mongoose";

const Schema = mongoose.Schema;

const goalSchema = new Schema({ text: String });

const GoalModel = mongoose.model("Goal", goalSchema);

export default GoalModel;
