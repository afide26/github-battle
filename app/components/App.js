var React = require('react');
var Home = require('./Home');
var Battle = require('./Battle');
var Nav = require('./Nav');
var ReactRouter = require('react-router-dom');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var Popular = require('./Popular');

class App extends React.Component {
  render(){
    return(
      <Router>
        <div className="container">
          <Nav/>
          <Route path="/" exact component={Home}/>
          <Route path="/battle" component={Battle}/>
          <Route path="/popular" component={Popular}/>
        </div>
      </Router>
    )
  }
}

module.exports = App;