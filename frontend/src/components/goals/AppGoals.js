import React from "react";

import "./AppGoals.css";
import Card from "../UI/Card";
import GoalItem from "./GoalItem";

function AppGoals(props) {
  const hasNoGoals = !props.goals || props.goals.length === 0;

  return (
    <section id="app-goals">
      <Card>
        <h2>Your Goals</h2>
        {hasNoGoals && <h2>No goals found. Start adding some!</h2>}
        <ul>
          {props.goals.map((goal) => (
            <GoalItem
              key={goal.id}
              id={goal.id}
              text={goal.text}
              onDelete={props.onDeleteGoal}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default AppGoals;
