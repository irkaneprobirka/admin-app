import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:3000/bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
      <div id="root"></div>
  );
}
