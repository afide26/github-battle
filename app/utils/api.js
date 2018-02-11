var axios = require('axios');
var ID = require('./Tokens');

var id = ID.GITHUB_ID;
var sec = ID.GITHUB_SECRET_ID;
var params = `?client_id=${id}+&client_secret=${sec}`;

module.exports = {
  battle:function(players){

  },

  fetchPopularRepos: function(language){
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function(response){
        return response.data.items;
      })
  }
}