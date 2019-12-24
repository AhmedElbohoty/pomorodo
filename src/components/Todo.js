import React, { useState, useContext } from "react";

import { AppContext } from "../App";

function Todo() {
  const { todo, setTodo, setShowTimer } = useContext(AppContext);
  const [isEmpty, setIsEmpty] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    if (!todo) {
      setIsEmpty(true);
    } else {
      setShowTimer(true);
    }
  }

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <label className="todof-label">أضف عملا للقيام به </label>
      <input
        className={`todof-input ${isEmpty && "is-err-border"}`}
        value={todo}
        onChange={e => {
          const { value } = e.target;

          setTodo(value);
          !value ? setIsEmpty(true) : setIsEmpty(false);
        }}
      />

      <input
        type="submit"
        className="todof-submit"
        value="أضف"
        disabled={isEmpty}
      />
    </form>
  );
}

export default Todo;
