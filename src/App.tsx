import React from "react";
import Routes from "@/router";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";

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
