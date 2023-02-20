import React from "react";

import "./Card.css";

function Card(props) {
  return <article className="card">{props.children}</article>;
}

export default Card;
