import {
  handleCreatedResponse,
  handleFailedResponse,
  handleNotFoundResponse,
  handleSucceededResponse,
  handleUnprocessableEntityResponse,
} from "./responseHandler.js";
import Logger from "./logger.js";
import Goal from "../models/goal.js";
import GoalStructure from "../structures/goalStructure.js";
import GoalsRepository from "../Repositories/GoalsRepository.js";

const handleErrorAndLog = (response, data, error, loggerErrorMessage) => {
  Logger.error(loggerErrorMessage);
  Logger.error(error.message);

  return handleFailedResponse(response, data);
};

const handleResponseAndLog = (response, data, loggerMessage) => {
  Logger.log(loggerMessage);

  return handleSucceededResponse(response, data);
};

export const getGoals = async (request, response) => {
  try {
    Logger.log("TRYING TO FETCH GOALS");

    const goals = await GoalsRepository.all();
    const mappedGoals = goals.map((goal) => new GoalStructure(goal));

    return handleResponseAndLog(
      response,
      { goals: mappedGoals },
      "getGoals - FETCHED GOALS"
    );
  } catch (error) {
    return handleErrorAndLog(
      response,
      { message: "Failed to load goals." },
      error,
      "getGoals - ERROR FETCHING GOALS"
    );
  }
};

export const getGoal = async (request, response) => {
  try {
    Logger.log("TRYING TO FETCH GOAL");

    const goalId = request?.params?.id;

    const hex = /([0-9a-fA-F]{24})/g;
    const isValidId = hex.test(goalId || "");

    if (!goalId || parseInt(goalId) < 1 || !isValidId) {
      Logger.log("Invalid goal id");

      return handleUnprocessableEntityResponse(response, {
        message: "Invalid goal id. Example: 63f38adf22ae09032e52bfc0",
      });
    }

    const goal = await GoalsRepository.find(goalId);

    if (!goal || !Object.keys(goal).length) {
      Logger.log(`Goal with id = ${goalId} not found`);

      return handleNotFoundResponse(response, {
        message: "Goal not found",
      });
    }

    return handleResponseAndLog(response, { goal }, "getGoal - FETCHED GOAL");
  } catch (error) {
    return handleErrorAndLog(
      response,
      { message: "Failed to load goal." },
      error,
      "getGoal - ERROR FETCHING GOAL"
    );
  }
};

export const insertGoal = async (request, response) => {
  Logger.log("TRYING TO STORE GOAL");

  /** @type {string | undefined} */
  const goalText = request?.body?.text;

  if (!goalText || goalText.trim().length === 0) {
    Logger.log("Invalid input: the goal cannot be empty");

    return handleUnprocessableEntityResponse(response, {
      message: "Invalid goal input text.",
    });
  }

  const goal = new Goal({ isCompleted: false, text: goalText });

  try {
    await goal.save();

    const result = handleCreatedResponse(response, {
      message: "Goal saved",
      goal: new GoalStructure(goal),
    });
    Logger.log("SAVED NEW GOAL");

    return result;
  } catch (err) {
    Logger.error("ERROR SAVING GOAL");
    Logger.error(err.message);

    return handleFailedResponse(response, { message: "Failed to save goal." });
  }
};

export const updateGoal = async (request, response) => {
  Logger.log("TRYING TO UPDATE GOAL");

  /** @type {string | undefined} */
  const goalText = request?.body?.text;
  const goalId = request?.params?.id;

  const hex = /([0-9a-fA-F]{24})/g;
  const isValidId = hex.test(goalId || "");

  if (!goalId || parseInt(goalId) < 1 || !isValidId) {
    Logger.log("Invalid goal id");

    return handleUnprocessableEntityResponse(response, {
      message: "Invalid goal id. Example: 63f38adf22ae09032e52bfc0",
    });
  }

  if (!goalText || goalText.trim().length === 0) {
    Logger.log("Invalid input: the goal cannot be empty");

    return handleUnprocessableEntityResponse(response, {
      message: "Invalid goal input text.",
    });
  }

  const goal = await Goal.find({ _id: goalId }).limit(1);

  if (!goal || !Object.keys(goal).length) {
    Logger.log(`Goal with id = ${goalId} not found`);

    return handleNotFoundResponse(response, {
      message: "Goal not found",
    });
  }

  const goalModel = goal[0];

  try {
    await Goal.updateOne(goal.id, { text: goalText });

    const result = handleSucceededResponse(response, {
      message: "Goal updated",
      goal: new GoalStructure({
        id: goalModel.id,
        text: goalText,
        isCompleted: goalModel.isCompleted,
      }),
    });

    Logger.log("UPDATED GOAL");

    return result;
  } catch (err) {
    Logger.error("ERROR UPDATING GOAL");
    Logger.error(err.message);

    return handleFailedResponse(response, {
      message: "Failed to update goal.",
    });
  }
};

export const deleteGoal = async (request, response) => {
  try {
    Logger.log("TRYING TO DELETE GOAL");

    const goalId = request.params.id;

    if (!goalId || parseInt(goalId) < 1) {
      Logger.log("Invalid goal id");

      return handleUnprocessableEntityResponse(response, {
        message: "Invalid goal id",
      });
    }
    await Goal.deleteOne({ _id: goalId });

    const result = handleSucceededResponse(response, {
      message: "Deleted goal!",
    });
    Logger.log("DELETED GOAL");

    return result;
  } catch (error) {
    Logger.error("ERROR DELETING GOAL");
    Logger.error(error.message);

    return handleFailedResponse(response, {
      message: "Failed to delete goal.",
    });
  }
};

export const deleteGoals = async (request, response) => {
  try {
    Logger.log("TRYING TO DELETE ALL GOALS");

    await Goal.deleteMany();

    const result = handleSucceededResponse(response, {
      message: "Deleted goals!",
    });
    Logger.log("DELETED GOALS");

    return result;
  } catch (error) {
    Logger.error("ERROR DELETING GOALS");
    Logger.error(error.message);

    return handleFailedResponse(response, {
      message: "Failed to delete goals.",
    });
  }
};
