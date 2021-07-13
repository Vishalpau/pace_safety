import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { LOGIN_URL } from '../../utils/constants';

const Authentication = ()=>{
    // window.location.href=`${LOGIN_URL}`
    window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`

    return(
<Switch>
          <Route path="/app" exact component={LandingCorporate} />
          <Route path="/landing-creative" exact component={LandingCreative} />
          <Route path="/" component={Application} />
          <Route path="/blog" component={ArticleNews} />
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
    )
    
}
export default Authentication;