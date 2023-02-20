import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GoalInput from "./components/goals/GoalInput";
import AppGoals from "./components/goals/AppGoals";
import ErrorAlert from "./components/UI/ErrorAlert";
import { ENDPOINT_GOAL, ENDPOINT_GOALS } from "./endpoints";

function App() {
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(ENDPOINT_GOALS);
        console.log(response);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Fetching the goals failed.");
        }

        setLoadedGoals(responseData.goals);
      } catch (error) {
        setError(
          error.message ||
            "Fetching goals failed - the server responded with an error."
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addGoalHandler(goalText) {
    setIsLoading(true);

    try {
      const response = await fetch(ENDPOINT_GOAL, {
        method: "POST",
        body: JSON.stringify({
          text: goalText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Adding the goal failed.");
      }

      setLoadedGoals((previousGoals) => {
        return [
          {
            id: responseData.goal.id,
            text: goalText,
          },
          ...previousGoals,
        ];
      });
    } catch (error) {
      setError(
        error.message ||
          "Adding a goal failed - the server responded with an error."
      );
    }
    setIsLoading(false);
  }

  async function deleteGoalHandler(goalId) {
    setIsLoading(true);

    try {
      const response = await fetch(`${ENDPOINT_GOAL}/${goalId}`, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Deleting the goal failed.");
      }

      setLoadedGoals((previousGoals) =>
        previousGoals.filter((goal) => goal.id !== goalId)
      );
    } catch (error) {
      setError(
        error.message ||
          "Deleting the goal failed - the server responded with an error."
      );
    }

    setIsLoading(false);
  }

  return (
    <section className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>UI (React) that connect to API (Express)</h2>
      </header>
      <main className="App-intro">
        {error && <ErrorAlert errorText={error} />}
        {!error && <GoalInput onAddGoal={addGoalHandler} />}
        {!error && !isLoading && (
          <AppGoals goals={loadedGoals} onDeleteGoal={deleteGoalHandler} />
        )}
      </main>
    </section>
  );
}

export default App;
