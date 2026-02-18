import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <div>
      {user ? (
        <Dashboard setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
