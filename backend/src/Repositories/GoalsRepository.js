import Goal from "../models/goal.js";
import Logger from "../services/logger.js";

export default class GoalsRepository {
  static all() {
    try {
      return Goal.find();
    } catch (error) {
      Logger.log(
        "GoalsRepository.getAll - ERROR TRYING TO GET ALL GOALS",
        error
      );
    }
  }
}
