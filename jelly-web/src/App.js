import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Menu } from "./components/HomeMenu/Menu";
import { Login } from "./components/auth/Login";
import { ProjectPage } from "./components/ProjectMenu/ProjectPage";

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="dynamic-chunk-loading center-items">Loading</div>
        }
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Menu} />
          <Route exact path="/:name" component={ProjectPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
