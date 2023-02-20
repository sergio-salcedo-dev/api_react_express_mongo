import {
  handleCreatedResponse,
  handleFailedResponse,
  handleNotFoundResponse,
  handleSucceededResponse,
  handleUnprocessableEntityResponse,
} from "./responseHandler.js";
import Logger from "./logger.js";
import Goal from "../models/goal.js";

export const getGoals = async (request, response) => {
  try {
    Logger.log("TRYING TO FETCH GOALS");

    const goals = await Goal.find();
    const mappedGoals = goals.map((goal) => ({
      id: goal.id,
      text: goal.text,
    }));

    const result = handleSucceededResponse(response, { goals: mappedGoals });

    Logger.log("FETCHED GOALS");

    return result;
  } catch (error) {
    Logger.error("ERROR FETCHING GOALS");
    Logger.error(error.message);

    return handleFailedResponse(response, { message: "Failed to load goals." });
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

    const goal = await Goal.find({ _id: goalId }).limit(1);

    if (!goal || !Object.keys(goal).length) {
      Logger.log(`Goal with id = ${goalId} not found`);

      return handleNotFoundResponse(response, {
        message: "Goal not found",
      });
    }

    const result = handleSucceededResponse(response, { goal });

    Logger.log("FETCHED GOAL");

    return result;
  } catch (error) {
    Logger.error("ERROR FETCHING GOAL");
    Logger.error(error.message);

    return handleFailedResponse(response, { message: "Failed to load goal." });
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

  const goal = new Goal({ text: goalText });

  try {
    await goal.save();

    const result = handleCreatedResponse(response, {
      message: "Goal saved",
      goal: { id: goal.id, text: goalText },
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

  // const goal = new Goal({ text: goalText });
  // const goal = await Goal.findOne({ _id: goalId });
  const goal = await Goal.find({ _id: goalId }).limit(1);

  if (!goal || !Object.keys(goal).length) {
    Logger.log(`Goal with id = ${goalId} not found`);

    return handleNotFoundResponse(response, {
      message: "Goal not found",
    });
  }

  try {
    await Goal.updateOne(goal.id, { text: goalText });

    const result = handleSucceededResponse(response, {
      message: "Goal updated",
      goal: { id: goal.id, text: goalText, isCompleted: goal.isCompleted },
    });

    Logger.log("UPDATED GOAL");

    return result;
  } catch (err) {
    Logger.error("ERROR UPDATING GOALS");
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
    Logger.log({ goalId });

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
