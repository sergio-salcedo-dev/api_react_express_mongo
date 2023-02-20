import Goal from "../models/goal.js";
import Logger from "../services/logger.js";

export default class GoalsRepository {
  /** @return {Promise<Goal>} */
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

  /**
   * @param {ObjectId} goalId
   * @return {Promise<Goal>}
   */
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

  /** @return {Promise<Goal>} */
  static deleteAll() {
    try {
      return Goal.deleteMany();
    } catch (error) {
      Logger.backendError(
        error,
        "GoalsRepository.deleteAll - ERROR TRYING TO DELETE ALL GOALS"
      );

      throw error;
    }
  }

  /**
   * @param {ObjectId} goalId
   * @return {Promise<Goal>}
   */
  static async delete(goalId) {
    try {
      return Goal.deleteOne({ _id: goalId });
    } catch (error) {
      Logger.backendError(
        error,
        "GoalsRepository.deleteAll - ERROR TRYING TO DELETE ALL GOALS"
      );

      throw error;
    }
  }
}
