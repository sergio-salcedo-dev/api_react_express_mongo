import React from "react";

import "./DeleteGoalsButton.css";
import Card from "../UI/Card";

function DeleteGoalsButton(props) {
  function deleteGoalsHandler(event) {
    event.preventDefault();

    const isConfirmed = window.confirm(
      "Are you sure? You are going to remove all your goals"
    );

    if (!isConfirmed) {
      return;
    }

    props.onDeleteAllGoals();
  }

  return (
    props.hasGoals && (
      <section id="delete-goals-button">
        <Card>
          <form onSubmit={deleteGoalsHandler}>
            <button>Delete Goals</button>
          </form>
        </Card>
      </section>
    )
  );
}

export default DeleteGoalsButton;
