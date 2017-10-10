import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser, loginUser} from '../store';

class LoginSignupForm extends Component {
  constructor() {
    super();
    this.state = {
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
    this.props.startUserSession(this.state);
    this.setState({email: '', password: ''});
  }
  onSignUpClick(event){
    event.preventDefault();
    this.props.signUpUser(this.state);
    this.setState({email: '', password: ''});

  }
  render() {
    const {onSubmit, onChange, onSignUpClick} = this;
    const {email, password} = this.state;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form className="well" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={onChange} name="email" className="form-control" type="text" value={email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={onChange} name="password" className="form-control" type="text" value={password} />
            </div>
              <button className="btn btn-success btn-sm">Log In</button>
              {' '}
              <button className="btn btn-warning btn-sm" onClick={onSignUpClick} >Sign Up</button>
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
