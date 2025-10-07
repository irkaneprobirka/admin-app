import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://172.16.1.69:3000/bundle.js";
    script.async = true;
    
    script.onload = () => {
      console.log("ok");
    };
    
    script.onerror = () => {
      console.error("error");
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="root">
        <p>Подключение к: 172.16.1.69:3000</p>
    </div>
  );
}