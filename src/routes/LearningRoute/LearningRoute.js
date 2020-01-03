import React, { Component } from 'react';
import Confetti from 'react-confetti';
import { Label, Input } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import Score from '../../components/Score/Score';
import LeBaguetteService from '../../services/leBaguette-service';
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    head: '',
    total: '',
    guess: '',
    answer: '',
    correctcount: '',
    incorrectcount: '',
    original: '',
    correct: null,
    loading: true,
    fetching: false
  };
  componentDidMount() {
    LeBaguetteService.getLanguageHead().then(data => {
      this.setState({
        head: data.nextWord,
        total: data.totalScore,
        correctcount: data.wordCorrectCount,
        incorrectcount: data.wordIncorrectCount,
        original: data.nextWord,
        loading: false
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ fetching: true });
    LeBaguetteService.postGuess(this.state.guess).then(data => {
      let original = this.state.head;
      this.setState({
        head: data.nextWord,
        answer: data.answer,
        correct: data.isCorrect,
        total: data.totalScore,
        correctcount: data.wordCorrectCount,
        incorrectcount: data.wordIncorrectCount,
        original: original,
        fetching: false
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

  result() {
    if (this.state.correct === true) {
      return (
        <>
          <p className="LearningRoute__correct">
            You were correct!{' '}
            <span role="img" aria-label="grinning face with smiling eyes">
              😁
            </span>
          </p>
          <p className="LearningRoute__correct-translation">
            The correct translation for <span className="LearningRoute__correct">{this.state.original}</span>{' '}
            was <span className="LearningRoute__correct">{this.state.answer}</span>!
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="LearningRoute__incorrect">
            Good try, but not quite right{' '}
            <span role="img" aria-label="confused face">
              😕
            </span>
          </p>
          <p className="LearningRoute__correct-translation">
            The correct translation for <span className="LearningRoute__correct">{this.state.original}</span>{' '}
            was <span className="LearningRoute__correct">{this.state.answer}</span> and you chose{' '}
            <span className="LearningRoute__incorrect">{this.state.guess}</span>!
          </p>
        </>
      );
    }
  }

  render() {
    if (this.state.loading) return <Loading className={'Loading'} />;
    else {
      return (
        <section className="LearningRoute__container">
          {(this.state.total === 10 || this.state.total === 35 || this.state.total === 100) &&
            this.state.answer && <Confetti />}
          <Score total={this.state.total} />
          {this.state.fetching ? (
            <Loading className={'Fetching'} />
          ) : (
            <div className="LearningRoute__check-answer">
              {!this.state.answer ? (
                <>
                  <h2 className="LearningRoute__translate">Translate the word:</h2>
                  <span className="LearningRoute__word">{this.state.head}</span>
                </>
              ) : (
                <div className="feedback">{this.result()}</div>
              )}
            </div>
          )}
          {!this.state.answer && !this.state.fetching ? (
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
            <div className="LearningRoute__encouragement">
              Continuez à pratiquer, vous êtes un peu plus près d'aller en France!
            </div>
          )}
        </section>
      );
    }
  }
}

export default LearningRoute;
