import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logout">
        <span>{this.context.user.name}</span>
        <nav className="Header__logout_nav">
          <Link onClick={this.handleLogoutClick} to="/login">
            <div className="Header__btn">Logout</div>
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className="Header__login_nav">
        <Link to="/login">Login</Link> <Link to="/register">Sign up</Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
        <h1 className="Header__primaryText">
          <Link to="/">Le Baguette</Link>
        </h1>
        <h2 className="Header__secondaryText">Spaced Repetition Learning</h2>
        {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
