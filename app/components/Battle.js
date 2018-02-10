var React = require('react');
var Component = React.Component;
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    var username = event.target.value;
    this.setState(function(){
      return(
        {
          username: username
        }
      )
    })
  }
  handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }
  render(){
    return(
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor={this.props.id}>{this.props.label}</label>
        <input type="text" 
          id={this.props.id}
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="github username"
          autoComplete='off'
          />
        <button 
            className="btn btn--form" 
            type="submit"
            disabled={!this.state.username}
            >
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id:PropTypes.string.isRequired,
  label:PropTypes.string.isRequired,
  onSubmit:PropTypes.func.isRequired
}

class Battle extends Component {

  constructor(props){
    super(props);

    this.state={
      playerOneName:'',
      playerTwoName:'',
      playerOneImage:null,
      playerTwoImage:null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username){
    this.setState(function(){
      var newState ={}
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username+ '.png?size=200';

      return newState;
    })
  }

  render(){
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    return(
      <div className="battle">
        <div className="row">
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label="Player One"
            onSubmit={this.handleSubmit}
          />}
          
          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label="Player Two"
            onSubmit={this.handleSubmit}
          />}
        </div>
      </div>
    )
  }
}
module.exports = Battle;