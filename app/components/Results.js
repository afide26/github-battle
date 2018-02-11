var React = require('react');
var queryString = require('query-string');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

function Profile(props){
  var info = props.info;
  return(
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="profile-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog} target="_blank">{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes ={
  info: PropTypes.object.isRequired
}
function Player(props){
  return(
    <div className="column">
      <h2 className="header">{props.label}</h2>
      <p className="column-score">Score:{props.score}</p>
      <Profile info={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile:PropTypes.object.isRequired
}
class Results extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      winner: null,
      loser:null,
      error:null,
      loading:true
    }
  }
  componentDidMount(){
    var players = queryString.parse(this.props.location.search);
    console.log(players);
    api.battle([players.playerOneName, players.playerTwoName])
      .then(function(results){
        if(results === null){
          return this.setState(function(){
            return{
              error: 'Looks like there is an error. Check if the users are in github',
              loading: false
            }
          })
        }

        this.setState(function(){
          return{
            error:null,
            winner: results[0],
            loser: results[1],
            loading: false
          }
        })
      }.bind(this));
  }
  render(){
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if(loading){
      return <h2 className="header">Loading...</h2>
    }

    if(error){
      return(
        <div>
          <p>{error}</p>
          <Link 
            className="btn btn--form btn-reset" 
            to='/battle'>
               &#9812; Back to Battle &#9812;
          </Link>
        </div>
      )
    }
    return(
      <div className="row">

        <Player 
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
        <Player 
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results;