import "./App.css";
import DataForm from "./components/dataForm";
import React from "react";
import Forum from "./components/Forum";
import TestBlog from "./components/testBlog";

function App() {
  return (
    <div className="App">
      <DataForm />
      <TestBlog />
    </div>
  );
}

export default App;
