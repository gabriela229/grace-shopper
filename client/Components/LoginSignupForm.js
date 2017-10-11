import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser, loginUser} from '../store';

class LoginSignupForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
  }
  onChange(event){
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }
  onSubmit(event){
    event.preventDefault();
    const {email, password} = this.state;
    this.props.startUserSession({email, password});
    this.setState({email: '', password: ''});
  }
  onSignUpClick(event){
    event.preventDefault();
    this.props.signUpUser(this.state);
    this.setState({name: '', email: '', password: ''});
  }
  render() {
    const {onSubmit, onChange, onSignUpClick} = this;
    const {name, email, password} = this.state;
    const {history} = this.props;
    const url = history.location.pathname;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form className="well" onSubmit={onSubmit}>
            <div className={`form-group ${url === '/signup' ? 'show' : 'hidden' }`}>
              <label htmlFor="name">Name</label>
              <input onChange={onChange} name="name" className="form-control" type="text" value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={onChange} name="email" className="form-control" type="text" value={email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={onChange} name="password" className="form-control" type="password" value={password} />
            </div>
              <button className={`btn btn-success btn-sm ${url === '/login' ? 'show' : 'hidden' }`}>Log In</button>
              {' '}
              <button className={`btn btn-warning btn-sm ${url === '/signup' ? 'show' : 'hidden' }`} onClick={onSignUpClick} >Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUpUser: (credentials) => {
      dispatch(createUser(credentials, ownProps.history));
    },
    startUserSession: (credentials) => {
      dispatch(loginUser(credentials, ownProps.history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm);
