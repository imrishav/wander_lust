import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Users } from "./user/pages/Users";
import { NewPlace } from "./places/pages/NewPlace";
import { MainNavigation } from "./shared/Navigation/MainNavigation";
import { UserPlaces } from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new">
            <NewPlace />
          </Route>
          <Route path="/places/:placeid">
            <UpdatePlaces />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;