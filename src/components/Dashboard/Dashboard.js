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
      <section className="dashboard">
        <h1>{this.state.language.name}</h1>
        <section className="total">Total Score: {this.state.language.total_score}</section>

        <section className="start-practicing-link">
          <Link to="/learn" className="start-practice">
            start practicing!
          </Link>
        </section>

        <section>
          <h1>Words to Practice</h1>
          <h2>
            <ul className="list">
              {this.state.words.map((word, index) => {
                return (
                  <li key={index} className="word">
                    <h2>{word.original}</h2>

                    <div className="correct-words">correct count: {word.correct_count}</div>
                    <div className="inocrrect-words">incorrect count: {word.incorrect_count}</div>
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
