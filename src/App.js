import React, { useState } from "react";
import Todo from "./components/Todo";
import Timer from "./components/Timer";

import "./style/base.css";
import "./style/layout.css";
import "./style/status.css";
import "./style/modules/index.css";

export const AppContext = React.createContext();

function App() {
  const [todo, setTodo] = useState("");
  const [showTimer, setShowTimer] = useState(false);

  return (
    <AppContext.Provider value={{ todo, setTodo, setShowTimer }}>
      <div id="l-app">
        {!showTimer && <Todo />}

        {showTimer && <Timer />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
