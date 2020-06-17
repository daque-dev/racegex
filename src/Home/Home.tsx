import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/join">Join a room</Link>
      </li>
      <li>
        <Link to={`/play/${randomRoom()}`}>Create new room</Link>
      </li>
    </ul>
  );
}
const randomRoom = () => Math.random().toString(20).substr(2, 8);

export default Home;
