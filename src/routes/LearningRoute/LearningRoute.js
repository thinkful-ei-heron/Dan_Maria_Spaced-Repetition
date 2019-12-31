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
          //head: data.nextWord,
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
        this.setState({
          answer: data.answer,
          correct: data.isCorrect,
          head: data.nextWord,
          total: data.totalScore,
          correctcount: data.wordCorrectCount,
          incorrectcount: data.wordIncorrectCount
        });
      });
  };
  handleNextWord = () => {
    this.setState({ answer: '', guess: '' });
  };

  handleguess = e => {
    const guess = e.target.value;
    let string = guess.toLowerCase();
    this.setState({ guess: string });
  };

  render() {
    console.log(this.state);
    let result;
    if (this.state.correct === true) {
      result = (
        <>
          <div className="correctFeedback">
            <h1>You were correct! :D</h1>
            <h2 className="correct-translation">
              The correct translation for {this.state.original} was {this.state.answer} and you chose {this.state.guess}!
            </h2>
          </div>
        </>
      );
    } else if (this.state.correct === false) {
      result = (
        <>
          <div className="correctFeedback">
            <h1>Good try, but not quite right :(</h1>
            <h2 className="correct-translation">
              The correct translation for {this.state.original} was {this.state.answer} and you chose { this.state.guess}!
            </h2>
          </div>
        </>
      );
    }

    return (
      <section className="learning">
        <h1 className="learning-score">{`Your total score is:${this.state.total}`}</h1>
        <div className="check-answer">
          {!this.state.answer ? (
            <>
              <h1 className="translation">translate the word: </h1>
              <span className="next">{this.state.original}</span>
            </>
          ) : (
            <div className="feedback">{this.state.correct ? result : result}</div>
          )}
        </div>
        {!this.state.answer ? (
          <form className="guess-word" onSubmit={e => this.handleSubmit(e)}>
            <Label htmlFor="guess-word" className="guess-word-label">
              What's the translation for this word?
            </Label>
            <Input
              id="guess-word-input"
              type="text"
              value={this.state.guess}
              onChange={e => this.handleguess(e)}
              name="guess-word"
              required
            />
            <Button className="submit-button" type="submit">
              Submit your answer
            </Button>
          </form>
        ) : (
          <Button className="next-word-button" onClick={this.handleNextWord}>
            Try another word!
          </Button>
        )}
        {!this.state.answer ? (
          <div className="correct-incorrect-info">
            <h1>You have answered this word correctly {this.state.correctcount} times!</h1>
          </div>
        ) : (
          <div>`Continuez à pratiquer, vous êtes un peu plus près d\'aller en France!`</div>
        )}
      </section>
    );
  }
}

export default LearningRoute;
