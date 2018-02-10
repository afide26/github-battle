var React = require('react');
var PropTypes = require('prop-types');

var api = require('../utils/api');

function RepoGrid(props){
  return(
    <ul className="popular-list">
      {props.repos.map(function(repo, index){
        return(
        <li className="popular-list--item" key={repo.id}>
          <p className="popular-list--rank">#{index +1}</p>
          <img className="popular-list--image" src={repo.owner.avatar_url} alt={repo.owner.login}/>
          <ul className="popular-list-item--details">
            <li><a href={repo.html_url} target="_blank">{repo.name}</a></li>
            <li className="popular-list-item--details-item">@{repo.owner.login}</li>
            <li className="popular-list-item--details-item">{repo.stargazers_count} &#9733;</li>
          </ul>
        </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}
function SelectLanguage(props){
  var languages=['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];

  return(
    <ul className="languages">
      {languages.map(function(lang){
        return(
          <li 
            style = {lang === props.language ? {color:'#d0021b', borderBottom:'1px solid #d0021b'}: null}
            key={lang} 
            onClick={props.onSelect.bind(null, lang)}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes ={
  language: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


class Popular extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount (){
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang){
    this.setState(function(){
      return {
        selectedLanguage:lang,
        repos:null
      }
    });
  
    api.fetchPopularRepos(lang)
    .then(function(repos){
      this.setState(function(){
        return {
          repos:repos
        }
      })
    }.bind(this));
  }

  render(){

    return(
      <div>
        <SelectLanguage 
          language={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? 
        <p className="popular-list--rank">Loading.....</p> : 
        <RepoGrid repos={this.state.repos}/>}
      </div>
    )
  }
}

module.exports = Popular;