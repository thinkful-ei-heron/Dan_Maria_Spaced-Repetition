import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import { Label, Input } from '../../components/Form/Form';
import Button from '../../components/Button/Button';

class LearningRoute extends Component {
  state = {
    head: '',
    total: '',
    guess: '',
    answer: '',
    correctcount: '',
    incorrectcount: '',
    original: '',
    correct: null
  };
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
      .then(data => {
        this.setState({
          head: data.nextWord,
          total: data.totalScore,
          correctcount: data.wordCorrectCount,
          incorrectcount: data.wordIncorrectCount,
          original: data.nextWord
        });
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ guess: this.state.guess })
    })
      .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
      .then(data => {
        console.log(data);
        let original = this.state.head;
        this.setState({
          head: data.nextWord,
          answer: data.answer,
          correct: data.isCorrect,
          total: data.totalScore,
          correctcount: data.wordCorrectCount,
          incorrectcount: data.wordIncorrectCount,
          original: original
        });
      });
  };
  handleNextWord = () => {
    this.setState({ answer: '', guess: '' });
  };

  handleguess = e => {
    const guess = e.target.value;
    this.setState({ guess: guess });
  };

  render() {
    console.log(this.state);
    let result;
    if (this.state.correct === true) {
      result = (
        <>
          <p className="LearningRoute__correct">You were correct! :D</p>
          <p className="LearningRoute__correct-translation">
            The correct translation for <span className="LearningRoute__correct">{this.state.original}</span>{' '}
            was <span className="LearningRoute__correct">{this.state.answer}</span>!
          </p>
        </>
      );
    } else if (this.state.correct === false) {
      result = (
        <>
          <p className="LearningRoute__incorrect">Good try, but not quite right :(</p>
          <p className="LearningRoute__correct-translation">
            The correct translation for <span className="LearningRoute__correct">{this.state.original}</span>{' '}
            was <span className="LearningRoute__correct">{this.state.answer}</span> and you chose{' '}
            <span className="LearningRoute__incorrect">{this.state.guess}</span>!
          </p>
        </>
      );
    }

    return (
      <section className="LearningRoute__container">
        <div className="LearningRoute__score">{`Your total score is: ${this.state.total}`}</div>
        <div className="LearningRoute__check-answer">
          {!this.state.answer ? (
            <>
              <h2 className="LearningRoute__translate">Translate the word:</h2>
              <span className="LearningRoute__word">{this.state.head}</span>
            </>
          ) : (
            <div className="feedback">{this.state.correct ? result : result}</div>
          )}
        </div>
        {!this.state.answer ? (
          <form className="LearningRoute__form" onSubmit={e => this.handleSubmit(e)}>
            <Label htmlFor="guess-word" className="guess-word-label">
              What's the translation for this word?
            </Label>
            <Input
              id="guess-word"
              type="text"
              value={this.state.guess}
              onChange={e => this.handleguess(e)}
              name="guess-word"
              required
            />
            <Button className="LearningRoute__btn" type="submit">
              Submit your answer
            </Button>
          </form>
        ) : (
          <Button className="LearningRoute__btn" onClick={this.handleNextWord}>
            Try another word!
          </Button>
        )}
        {!this.state.answer ? (
          <div className="LearningRoute__correct-incorrect-info">
            <p>You have answered this word correctly {this.state.correctcount} times!</p>
            <p>You have answered this word incorrectly {this.state.incorrectcount} times!</p>
          </div>
        ) : (
          <div className="LearningRoute__correct-incorrect-info">
            Continuez à pratiquer, vous êtes un peu plus près d'aller en France!
          </div>
        )}
      </section>
    );
  }
}

export default LearningRoute;
