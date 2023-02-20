import Goal from "../models/goal.js";
import Logger from "../services/logger.js";

export default class GoalsRepository {
  static all() {
    try {
      return Goal.find();
    } catch (error) {
      Logger.backendError(
        error,
        "GoalsRepository.getAll - ERROR TRYING TO GET ALL GOALS"
      );

      throw error;
    }
  }

  static find(goalId) {
    try {
      return Goal.find({ _id: goalId }).limit(1);
    } catch (error) {
      Logger.backendError(
        error,
        `GoalsRepository.find - ERROR TRYING TO GET GOAL ID=${goalId}`
      );

      throw error;
    }
  }

  /**
   * @param {GoalStructure} goal
   * @return {Promise<Goal>}
   */
  static save(goal) {
    try {
      const { isCompleted, text } = goal;
      const newGoal = new Goal({ isCompleted, text });

      return newGoal.save();
    } catch (error) {
      Logger.backendError(
        error,
        "GoalsRepository.save - ERROR TRYING TO SAVE GOAL"
      );

      throw error;
    }
  }
}
