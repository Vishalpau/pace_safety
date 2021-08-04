import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LOGIN_URL } from "../../utils/constants";

const Authentication = () => {
  return (
    <Switch>
      <Route path="/app" exact component={LandingCorporate} />
      <Route path="/landing-creative" exact component={LandingCreative} />
      <Route path="/" component={Application} />
      <Route path="/blog" component={ArticleNews} />
      <Route component={Auth} />
      <Route component={NotFound} />
    </Switch>
  );
};
export default Authentication;
