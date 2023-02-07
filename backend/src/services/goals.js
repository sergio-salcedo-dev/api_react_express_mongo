import {
  handleCreatedResponse,
  handleFailedResponse,
  handleSucceededResponse,
  handleUnprocessableEntityResponse,
} from "./responseHandler.js";
import Logger from "./logger.js";

export const getGoals = async (request, response) => {
  try {
    Logger.log("TRYING TO FETCH GOALS");

    const goals = [{ id: 1, text: "Hello World" }];
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

  try {
    const result = handleCreatedResponse(response, {
      message: "Goal saved",
      goal: { id: 1, text: goalText },
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
    Logger.log(request.params.id);

    const goalId = request.params.id;

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
