/* eslint-disable react/no-unescaped-entities */
import {useState} from "react";
import App from "./App.jsx";

function AboutView() {
  const [showDefaulfView] = useState(false);

  return (
    <>
      {showDefaulfView ? (
        // Jos showDefaulfView on tosi, suorita tämä osa
        <App />
      ) : (
        // Muussa tapauksessa suorita tämä osa
        <>
          <div></div>
          <h1>About</h1>
          <div className="text">
            <p>Author: Matias Leppänen &#169;</p>

            <p>
              Manual: User can add a new task by adding a task name and if
              wanted, tags for the added task. Seperate the tags by commas. User
              can delete tasks and specific tags if wanted.
            </p>
            <p>
              Made as a part of a Frontend school course. Json-server is used to
              store the tasks and tags as a mock database.
            </p>
            <p>Hours used to make this: 40</p>
          </div>
        </>
      )}
    </>
  );
}

export default AboutView;
