import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  state = {
    head: '',
    total: '',
    guess: '',
    answer: '',
    correctcount: '',
    incorrectcount: '',
    original: ''

  }
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`,{
      method:'GET',
      headers:{
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
    
    .then( res => 
      (!res.ok)
      ? res.json()
      .then( e => Promise.reject(e))
      : res.json())
      .then( data => {
        this.setState({
          head: data.next, 
          total: data.total,
          correctcount: data.correctcount,
          incorrectcount: data.incorrectcount,
          original: data.original,
        })
    })
  }
  handleSubmit=(e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method:'POST',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({guess: this.state.guess})  
    })
    .then( res => 
      (!res.ok) 
      ? res.json()
      .then( e => Promise.reject(e))
      :res.json())
      .then( data => {
        this.setState({
          answer: data.answer, 
          head: data.next,
          total: data.total,
          correctcount: data.correctcount,
          incorrectcount: data.incorrectcount,
          original: this.state.head
        })
      })
  }
  handleNextWord = () => {
    this.setState({answer: '', guess: ''})
  }
  handleguess = () => {
    const guess = e.target.value; 
    let string = guess.toLowerCase();
    this.setState({ guess: string})
  }


  renderFeedback() {
    if(this.state.isCorrect === true) {
      return (
        <div className="iscorrectFeedback">
          <h1>You were correct! :D</h1>
          <h2> The correct translation for {this.state.original} was {this.state.answer} and you chose {this.state.guess}!</h2>
        </div>
      )
    }
    else if(this.state.isCorrect === false){
      return(
        <div className="iscorrectFeedback">
        <h1>Good try, but not quite right :(</h1>
        <h2> The correct translation for {this.state.original} was {this.state.answer} and you chose {this.state.guess}!</h2>
      </div>
      )
    }
    return (
      <section className="learning">
        <h1 className='learning-score'>
          {`Your total score is:${this.state.total}`}
        </h1>
      </section>

      <div className='check-guess'>
        {this.state.guess}
      </div>
    );
  }
}

export default LearningRoute
