var React = require('react');

class Results extends React.Component{
  render(){
    console.log(this.props);
    return(
      <div className="Result column">
        <h2 className="header">Results</h2>
      </div>
    )
  }
}

module.exports = Results;