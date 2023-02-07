import {
  handleFailedResponse,
  handleSuccessfulResponse,
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

    const result = handleSuccessfulResponse(response, { goals: mappedGoals });

    Logger.log("FETCHED GOALS");

    return result;
  } catch (error) {
    Logger.error("ERROR FETCHING GOALS");
    Logger.error(error.message);

    return handleFailedResponse(response, { message: "Failed to load goals." });
  }
};
