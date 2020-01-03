import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import LeBaguetteService from '../../services/leBaguette-service';
import './Dashboard.css';

export class Dashboard extends Component {
  state = {
    language: '',
    words: [],
    loading: true
  };
  componentDidMount() {
    LeBaguetteService.getLanguage()
      .then(res => {
        this.setState({
          language: res.language,
          words: res.words,
          loading: false
        });
      })
      .catch(error => {
        console.log({ error });
      });
  }
  render() {
    if (this.state.loading) return <Loading className={'Loading'} />;
    else {
      return (
        <section className="Dashboard">
          <div className="Dashboard__header">
            <h2>{this.state.language.name}</h2>
            <span className="total">Total Score: {this.state.language.total_score}</span>
          </div>
      
          <section className="Dashboard__btn">
            <Link to="/learn" className="Dashboard__link">
              Start Practicing!
            </Link>
          </section>

        <section>
          <h3 className="Dashboard__words_header">Words to Practice</h3>
          <div>
            <ul className="Dashboard__list">
              {this.state.words.map((word, index) => {
                return (
                  <li className="Dashboard__li" key={index}>
                    <span className="Dashboard__original">{word.original}</span>
                    {/* <div className="Dashboard__guessed">{word.translation}</div> */}
                    <div className="Dashboard__guessed">
                      <div className="Dashboard__correct-words">correct: {word.correct_count}</div>
                      <div className="Dashboard__inocrrect-words">incorrect: {word.incorrect_count}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        </section>
      )
    }
  }
}

export default Dashboard;
