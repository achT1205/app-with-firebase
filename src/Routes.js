import React from "react";
import { Route, Switch } from "react-router-dom";

//pages
import HomePage from "./pages/home/";
import EditPage from "./pages/edit";
import ListPage from "./pages/list";
import DetailsPage from "./pages/details";
import ManagePage from "./pages/manage"


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/create" component={EditPage} />
        <Route path="/edit/:id" component={EditPage} />
        <Route path="/announcements" component={ListPage} />
        <Route path="/details/:id" component={DetailsPage} />
        <Route path="/manage" component={ManagePage} />
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
