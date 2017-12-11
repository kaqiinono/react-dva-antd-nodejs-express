import React from 'react';
import {  Router, Route, Switch } from 'dva/router';
import layout from './container/Layout/index'
import loginPage from './container/Login/index'
import signUpPage from './container/SignUp/index'
import lsPage from './container/index/index'
import findPage from './container/fun1/index'
import personPage from './container/Personalmes/index'
import moodPage from './container/mood/index'
import displayPage from './container/mesdisplay/index'
import setPage from './container/userSet/index'
import pwdchangePage from './container/pwdChange/index'
import notFound from './container/404/index'
function RouterConfig({ history }) {
  return(
  <Router history={history}>
      <Switch>
      <Route exact path="/" component={lsPage}/>
      <Route exact path="/layout" component={layout} />
      <Route exact path="/404" component={notFound}/>
      {/* <Route   path="/login" component={loginPage} />
      <Route   path="/sign" component={signUpPage} />
      <Route   path="/personal" component={personPage} />
      <Route   path="/find" component={findPage} />
      <Route   path="/mood" component={moodPage} />
      <Route   path='/display' component={displayPage}/>
      <Route   path='/userset' component={setPage}/>
      <Route   path='/pwdchange' component={pwdchangePage}/> */}
      </Switch>
  </Router>
  )
} 
export default RouterConfig;











