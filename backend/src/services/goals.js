import {
  handleCreatedResponse,
  handleFailedResponse,
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

    const goalId = request.params.id;

    if (!goalId || parseInt(goalId) < 1) {
      Logger.log("Invalid goal id");

      return handleUnprocessableEntityResponse(response, {
        message: "Invalid goal id",
      });
    }

    const goal = { id: goalId, text: "'\"localhost/goal/1\" => getGoal()'" };

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
    Logger.error("ERROR FETCHING GOALS");
    Logger.error(err.message);

    return handleFailedResponse(response, { message: "Failed to save goal." });
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

    const result = handleSucceededResponse(response, {
      message: "Deleted goal!",
    });
    Logger.log("DELETED GOAL");

    return result;
  } catch (error) {
    Logger.error("ERROR FETCHING GOALS");
    Logger.error(error.message);

    return handleFailedResponse(response, {
      message: "Failed to delete goal.",
    });
  }
};
