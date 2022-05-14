import React from "react";
import Routes from "@/router";
import "./App.css";
const { BrowserRouter, Switch } = require("react-router-dom");

const App: React.FC = (props): any => {
  return (
    <BrowserRouter>
      <Switch>
        <Routes auth={{}} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
