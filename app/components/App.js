var React = require('react');
var Home = require('./Home');
var Battle = require('./Battle');
var Nav = require('./Nav');
var NotFound = require('./NotFound');
var ReactRouter = require('react-router-dom');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Switch = ReactRouter.Switch;

var Popular = require('./Popular');

class App extends React.Component {
  render(){
    return(
      <Router>
        <div className="container">
          <Nav/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/battle" exact component={Battle}/>
            <Route path="/popular" component={Popular}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;