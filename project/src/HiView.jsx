/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import App from "./App.jsx";
import imageCat from "./Nyyti.png";

function HiView() {
  const [showDefaulfView] = useState(false);

  return (
    <>
      {showDefaulfView ? (
        // Jos showDefaulfView on tosi, suorita tämä osa
        <App />
      ) : (
        // Muussa tapauksessa suorita tämä osa
        <>
          <img
            src={imageCat}
            alt="Nyyti-kissa"
            style={{
              maxWidth: "80%",
              maxHeight: "80vh",
              margin: "auto",
              display: "block",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          />
        </>
      )}
    </>
  );
}

export default HiView;
