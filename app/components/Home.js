var React = require('react');
var Component = React.Component;
var Link = require('react-router-dom').Link;
class Home extends Component {
  render(){
    return(
      <div className="home">
        <h1 className="home-title">Welcome to Github Battle</h1>
        <h2 className="home-subtitle">See Who's More Popular in Github</h2>
        <Link className="btn" to="/battle">
          Battle <span className="btn-arrow">&rarr;</span>
        </Link>
      </div>
    )
  }
}
module.exports = Home;