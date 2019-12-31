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
    original: ''
  };
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
      .then(data => {
        this.setState({
          head: data.next,
          total: data.total,
          correctcount: data.correctcount,
          incorrectcount: data.incorrectcount,
          original: data.original
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
        this.setState({
          answer: data.answer,
          head: data.next,
          total: data.total,
          correctcount: data.correctcount,
          incorrectcount: data.incorrectcount,
          original: this.state.head
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

  renderFeedback() {
    let result;

    if (this.state.isCorrect === true) {
      return (result = (
        <div className="iscorrectFeedback">
          <h1>You were correct! :D</h1>
          <h2>
            {' '}
            The correct translation for {this.state.original} was {this.state.answer} and you chose{' '}
            {this.state.guess}!
          </h2>
        </div>
      ));
    } else if (this.state.isCorrect === false) {
      return (
        <div className="iscorrectFeedback">
          <h1>Good try, but not quite right :</h1>
          <h2>
            {' '}
            The correct translation for {this.state.original} was {this.state.answer} and you chose{' '}
            {this.state.guess}!
          </h2>
        </div>
      );
    }
  }

  render() {
    let result = ' ';
    return (
      <section className="learning">
        <h1 className="learning-score">{`Your total score is:${this.state.total}`}</h1>
        <div className="check-answer">
          {!this.state.answer ? (
            <>
              <h1 className="translation">translate the word: </h1>
              <span className="next">{this.state.head}</span>
            </>
          ) : (
            <div className="feedback">{this.state.isCorrect ? result : result}</div>
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
