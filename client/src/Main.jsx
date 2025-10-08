import React from "react";

export default function Main() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ border: "1px solid blue", padding: "10px", margin: "10px" }}
      >
        <h2>app c 3000 порта</h2>
        <iframe
          src="http://172.16.1.69:3000"
          style={{ width: "100%", height: "400px", border: "none" }}
          title="3000"
        />
      </div>

      <div
        style={{ border: "1px solid green", padding: "10px", margin: "10px" }}
      >
        <h2>app c 3002 порта</h2>
        <iframe
          src="http://172.16.1.69:3002"
          style={{ width: "100%", height: "400px", border: "none" }}
          title="App 3002"
        />
      </div>
    </div>
  );
}
