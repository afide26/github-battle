var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props){
  var languages=['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];

  return(
    languages.map(function(lang){
      return (
        <li 
          style = {lang === props.language ? {color:'#d0021b', borderBottom:'1px solid #d0021b'}: null}
          key={lang} 
          onClick={props.onSelect.bind(null, lang)}>
          {lang}
        </li>
      )
    })
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
      selectedLanguage: 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang){
    this.setState(function(){
      return {
        selectedLanguage:lang
      }
    })
  }

  render(){

    return(
      <ul className="languages">
        <SelectLanguage 
          language={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </ul>
    )
  }
}

module.exports = Popular;