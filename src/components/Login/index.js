import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', isShowErrorMgs: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMessage => {
    this.setState({isShowErrorMgs: true, errorMsg: errorMessage})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isShowErrorMgs, errorMsg} = this.state
    console.log(username)
    console.log(password)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="logit-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="logo-image"
          />
          <form className="user-input-container" onSubmit={this.onClickLogin}>
            <div className="userName-section">
              <label className="label-section" htmlFor="username">
                USERNAME
              </label>
              <input
                type="input"
                className="input-section"
                placeholder="Enter Username"
                id="username"
                name="username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="userName-section">
              <label className="label-section" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="input-section"
                placeholder="Enter Password"
                id="password"
                name="password"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {isShowErrorMgs ? <p className="errorMessage">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
