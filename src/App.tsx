import React from "react";
import Routes from "@/router";
import "./App.css";
import { HashRouter, Switch } from "react-router-dom";

const App: React.FC = (props): any => {
  return (
    <HashRouter>
      <Switch>
        <Routes auth={{}} />
      </Switch>
    </HashRouter>
  );
};

export default App;
