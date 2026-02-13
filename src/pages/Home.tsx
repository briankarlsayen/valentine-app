import React from "react";
import { NavLink } from "react-router";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <NavLink to="/avoid">
          <button>Avoid</button>
        </NavLink>
        <NavLink to="/confirm">
          <button>Confirm</button>
        </NavLink>
        <NavLink to="/wordle">
          <button>Wordle</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
