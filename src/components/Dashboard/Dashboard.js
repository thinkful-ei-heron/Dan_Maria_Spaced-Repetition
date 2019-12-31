import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import config from '../../config';

export class Dashboard extends Component {
  state = {
    language: '',
    words: []
  };
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
      .then(res => {
        this.setState({
          language: res.language,
          words: res.words
        });
      })
      .catch(error => {
        console.log({ error });
      });
  }
  render() {
    return (
      <section className="Dashboard">
        <div className="Dashboard__header">
          <h1>{this.state.language.name}</h1>
          <span className="total">Total Score: {this.state.language.total_score}</span>
        </div>

        <section className="Dashboard__btn">
          <Link to="/learn" className="Dashboard__link">
            Start Practicing!
          </Link>
        </section>

        <section>
          <h1 className="Dashboard__words_header">Words to Practice</h1>
          <h2>
            <ul className="Dashboard__list">
              {this.state.words.map((word, index) => {
                return (
                  <li className="Dashboard__li" key={index}>
                    <span className="Dashboard__original">{word.original}</span>
                    <div className="Dashboard__guessed">
                      <div className="Dashboard__correct-words">correct: {word.correct_count}</div>
                      <div className="Dashboard__inocrrect-words">incorrect: {word.incorrect_count}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </h2>
        </section>
      </section>
    );
  }
}

export default Dashboard;
