import React from "react";
import { Route, Switch } from "react-router-dom";

//pages
import HomePage from "./pages/home/";
import EditPage from "./pages/Edit";


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/edit" component={EditPage} />
        <Route path="/edit/:id" component={EditPage} />
       {/*
       <Route path="/details/:id" component={DetailsPage} />
       
        <Route path="/about" component={AboutPage} />
        <Route path="/edit/:id" component={EditPage} />
        <Route path="/summary/:id" component ={SummaryPage}/>
        <Route path="/shop" component ={shopPage}/>
      */}
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
