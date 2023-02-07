export const getGoals = async (request, response) => {
  try {
    console.log("TRYING TO FETCH GOALS");

    const goals = [{ id: 1, text: "Hello World" }];

    const result = response.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });

    console.log("FETCHED GOALS");

    return result;
  } catch (error) {
    console.error("ERROR FETCHING GOALS");
    console.error(error.message);

    return response.status(500).json({ message: "Failed to load goals." });
  }
};
