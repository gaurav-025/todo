"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically load Form and TODOList without SSR
const Form = dynamic(() => import("@/components/Form"), { ssr: false });
const TODOList = dynamic(() => import("@/components/TODOList"), { ssr: false });

import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";

function Home() {
  const [todos, setTodos] = React.useState([]);
  const [isClient, setIsClient] = React.useState(false);

  // Confirm client-side rendering
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Load todos from localStorage after confirming client-side rendering
  React.useEffect(() => {
    if (isClient) {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, [isClient]);

  if (!isClient) return null; // Prevent SSR mismatch by rendering null initially

  const todos_completed = todos.filter((todo) => todo.is_completed === true).length;
  const total_todos = todos.length;

  return (
    <div className="wrapper" suppressHydrationWarning>
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Form todos={todos} setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Home;
