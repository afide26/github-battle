var React = require('react');
var Component = React.Component;
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview(props){
  return(
    <div>
      <div className="column">
        <img 
          className="avatar"
          alt={"Avatar for " + props.username}
          src={props.avatar}
          />
          <h2 className="username">@{props.username}</h2>
          <button 
            className="btn btn--form btn-reset"
            onClick={props.onReset.bind(null, props.id)}>
            Reset
          </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

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
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username){
    this.setState(function(){
      var newState ={}
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username+ '.png?size=200';

      return newState;
    })
  }
  handleReset(id){
    this.setState(function(){
      var newState ={}
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;

      return newState;
    })   
  }

  render(){
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;

    return(
      <div className="battle">
        <div className="row">
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label="Player One"
            onSubmit={this.handleSubmit}
          />}
          
          {playerOneImage !== null &&
            <PlayerPreview
             avatar={playerOneImage}
             id='playerOne'
             username={playerOneName}
             onReset={this.handleReset}/>}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label="Player Two"
            onSubmit={this.handleSubmit}
          />}

           { playerTwoImage !== null &&
            <PlayerPreview
             avatar={playerTwoImage}
             id='playerTwo'
             username={playerTwoName}
             onReset={this.handleReset}/>}
        </div>
        {playerOneImage && playerTwoImage &&
        <Link 
            className="btn btn--form battle-btn" 
            to={{
              pathname: match.url +'/results',
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
               &#9812; Battle &#9812;
        </Link>}
      </div>
    )
  }
}
module.exports = Battle;