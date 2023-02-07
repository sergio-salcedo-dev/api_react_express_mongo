import {
  handleFailedResponse,
  handleSuccessfulResponse,
} from "./responseHandler.js";

export const getGoals = async (request, response) => {
  try {
    console.log("TRYING TO FETCH GOALS");

    const goals = [{ id: 1, text: "Hello World" }];
    const mappedGoals = goals.map((goal) => ({
      id: goal.id,
      text: goal.text,
    }));

    const result = handleSuccessfulResponse(response, { goals: mappedGoals });

    console.log("FETCHED GOALS");

    return result;
  } catch (error) {
    console.error("ERROR FETCHING GOALS");
    console.error(error.message);

    return handleFailedResponse(response, { message: "Failed to load goals." });
  }
};
