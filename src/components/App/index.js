import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

// own components
import Home from '../Home'
import Register from '../Register'
import logic from '../../logic'
import Login from '../Login'
import Topbar from '../Topbar'
import Favorites from '../Favorites'
import NotFound from '../Not-Found-404'
import Footer from '../Footer'

// styles
import './index.sass'


class App extends Component {

  state = { loginFeedback: null, registerFeedback: null }

  // register an user - redirects to /login
  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
      logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => {
          this.setState({ registerFeedback: null })
          this.props.history.push('/login')
          alert('you have successfully registered')
        })
        .catch(({ message }) => {
          this.setState({ registerFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ registerFeedback: message })
    }
  }

  // login a user - set userId and token
  handleLogin = (email, password) => {
    try {
      logic.loginUser(email, password)
        .then(() => {
          this.setState({ loginFeedback: null })
          alert('you have successfully login')
        }).catch(({ message }) => {
          this.setState({ loginFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ loginFeedback: message })
    }
  }

  // logout an user - redirects to /home
  handleLogout = () => {
    logic.logout()
    this.props.history.push('/home')
  }

  // click to /register
  handleGoToRegister = () => this.setState({ registerFeedback: null }, () => this.props.history.push('/register'))
  handleGoToLogin = () => this.setState({ loginFeedback: null }, () => this.props.history.push('/login'))
  handleGoToHome = () => this.props.history.push('/home')
  handleGoToFavorites = () => this.props.history.push('/favorites')


  render() {

    const { handleRegister, handleLogin, handleLogout, handleGoToRegister, handleGoToLogin, handleGoToHome, handleGoToFavorites, state: { loginFeedback, registerFeedback } } = this

    return (
      <div className="app">

        <Topbar user={logic.userLoggedIn} onGoToHome={handleGoToHome} onGoToFavorites={handleGoToFavorites} onLogout={handleLogout} onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />

        <Switch>
          <Route path='/register' render={() => !logic.userLoggedIn ? <Register onRegister={handleRegister} feedback={registerFeedback} /> : <Redirect to='/login' />} />
          <Route path='/login' render={() => !logic.userLoggedIn ? <Login onLogin={handleLogin} feedback={loginFeedback} /> : <Redirect to='/home' />} />
          <Route path='/favorites' render={() => logic.userLoggedIn ? <Favorites /> : <Redirect to='/home' />} />
          <Route path='/home' render={() => <Home />} />
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          <Route component={NotFound} />
        </Switch>

        <Footer />

      </div>
    )
  }
}

export default withRouter(App)

