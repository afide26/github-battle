var React = require('react');
var Component = React.Component;
var Link = require('react-router-dom').Link;
class Battle extends Component {
  render(){
    return(
      <div className="battle">
        <h1 className="battle-title">Welcome to Github battle</h1>
        <h2 className="battle-subtitle">See Who's More Popular in Github</h2>
        <Link className="btn" to="/battle">
          Battle <span className="btn-arrow">&rarr;</span>
        </Link>
      </div>
    )
  }
}
module.exports = Battle;