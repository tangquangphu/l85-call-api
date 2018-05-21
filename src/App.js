import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';

//Routes
import routes from './routes';
import {Switch, BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {
  render() {
    return (
      <Router>
        <div >
          {/* Menu */}
          <Menu></Menu>

          {/* Container */}
          <div className="container">
            <div className="row">
              
              {this.showContentMenus(routes)}
            </div>
          </div>

        </div>
      </Router>
    );
  }

  showContentMenus = (routes) => {
    var result = null;
    if(routes.length > 0){
      result = routes.map((route, index) => {
        return(
        <Route key={index}
               path={route.path}
               exact={route.exact}
               component={route.main}
        ></Route>
        )
      });
    }
    return <Switch>
              {result}
          </Switch>
  }
}

export default App;
