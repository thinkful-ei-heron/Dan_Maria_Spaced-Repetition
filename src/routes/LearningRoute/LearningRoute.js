import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  state = {
    head: '',
    total: '',
    


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
          head: data
        })

    })
  }
  render() {
    return (
      <section className="learning">
        <h1 className='learning-score'>
          {`Your total score is:${this.state.total}`}
        </h1>
      </section>
    );
  }
}

export default LearningRoute
