var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var Link = require('react-router-dom').Link;

function Nav(){
  return(
    <ul className="nav">
      <li className="nav-item">
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;