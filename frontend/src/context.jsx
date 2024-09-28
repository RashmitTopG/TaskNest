import { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoRender({ children }) {
  const [render, setRender] = useState(false);

  return (
    <TodoContext.Provider value={{ render, setRender }}>
      {children}
    </TodoContext.Provider>
  );
}
