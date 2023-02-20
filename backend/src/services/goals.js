import {
  handleCreatedResponse,
  handleErrorAndLog,
  handleNotFoundResponse,
  handleResponseAndLog,
  handleUnprocessableEntityResponse,
} from "./responseHandler.js";
import Logger from "./logger.js";
import GoalStructure from "../structures/goalStructure.js";
import GoalsRepository from "../Repositories/GoalsRepository.js";

export const getGoals = async (request, response) => {
  try {
    Logger.log("getGoals - TRYING TO FETCH GOALS");

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
  Logger.log("insertGoal - TRYING TO STORE GOAL");

  /** @type {string | undefined} */
  const goalText = request?.body?.text;

  if (!goalText || goalText.trim().length === 0) {
    Logger.log("Invalid input: the goal cannot be empty");

    return handleUnprocessableEntityResponse(response, {
      message: "Invalid goal input text.",
    });
  }

  try {
    const goal = await GoalsRepository.save(
      new GoalStructure({ isCompleted: false, text: goalText })
    );

    Logger.log(`insertGoal - SAVED NEW GOAL WITH ID=${goal.id}`);

    return handleCreatedResponse(response, {
      message: "Goal saved",
      goal: new GoalStructure(goal),
    });
  } catch (error) {
    return handleErrorAndLog(
      response,
      { message: "Failed to save goal." },
      error,
      "insertGoal - ERROR SAVING GOAL"
    );
  }
};

export const updateGoal = async (request, response) => {
  Logger.log("updateGoal - TRYING TO UPDATE GOAL");

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

  const goal = await GoalsRepository.find(goalId);

  if (!goal || !Object.keys(goal).length) {
    Logger.log(`Goal with id = ${goalId} not found`);

    return handleNotFoundResponse(response, {
      message: "Goal not found",
    });
  }

  try {
    await GoalsRepository.update(
      goal.id,
      new GoalStructure({ text: goalText })
    );

    const goalModel = goal[0];

    return handleResponseAndLog(
      response,
      {
        message: "Updated goal",
        goal: new GoalStructure({
          id: goalModel.id,
          text: goalText,
          isCompleted: goalModel.isCompleted,
        }),
      },
      `updateGoal - UPDATED GOAL WITH ID=${goalModel.id}`
    );
  } catch (error) {
    return handleErrorAndLog(
      response,
      { message: "Failed to update goal." },
      error,
      "updateGoal - ERROR UPDATING GOAL"
    );
  }
};

export const deleteGoal = async (request, response) => {
  try {
    Logger.log("deleteGoal - TRYING TO DELETE GOAL");

    const goalId = request.params.id;

    if (!goalId || parseInt(goalId) < 1) {
      Logger.log("Invalid goal id");

      return handleUnprocessableEntityResponse(response, {
        message: "Invalid goal id",
      });
    }

    await GoalsRepository.delete(goalId);

    return handleResponseAndLog(
      response,
      { message: "Deleted goal!" },
      "deleteGoal - DELETED GOAL"
    );
  } catch (error) {
    return handleErrorAndLog(
      response,
      { message: "Failed to delete goal." },
      error,
      "deleteGoal - ERROR DELETING GOAL"
    );
  }
};

export const deleteGoals = async (request, response) => {
  try {
    Logger.log("deleteGoals - TRYING TO DELETE ALL GOALS");

    await GoalsRepository.deleteAll();

    return handleResponseAndLog(
      response,
      { message: "Deleted goals!" },
      "deleteGoals - DELETED GOALS"
    );
  } catch (error) {
    return handleErrorAndLog(
      response,
      { message: "Failed to delete goals." },
      error,
      "deleteGoals - ERROR DELETING GOALS"
    );
  }
};
