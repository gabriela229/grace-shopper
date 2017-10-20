import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser, loginUser, setError} from '../store';

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
  }
  onChange(event){
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
    if (this.props.error.length > 0 ){
      this.props.clearError();
    }
  }
  onSubmit(event){
    event.preventDefault();
    const {location, cart} = this.props;
    const url = location.pathname;
    const {email, password} = this.state;
    url === '/login' || url === '/admin' ? this.props.startUserSession({email, password}, cart) : this.props.signUpUser(this.state, cart);
    this.setState({name: '', email: '', password: ''});
  }
  componentDidMount(){
    //if user tries to access /admin directly they will get an error
    // except directly from /login or /signup since they are already mounted
    const url = this.props.location.pathname;
    if (url === '/admin'){
      this.props.loginError('Please log in');
    }
  }
  componentDidUpdate(prevProps){
  //clear error message
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.error.length > 0){
    this.props.clearError();
    }
  }
  componentWillUnmount(){
    if (this.props.error.length > 0 ){
      this.props.clearError();
    }
  }
  render() {
    const {onSubmit, onChange} = this;
    const {name, email, password} = this.state;
    const {history, error} = this.props;
    const url = history.location.pathname;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form className="well" onSubmit={onSubmit}>
          {error.length > 0 ? <div className="alert alert-danger">{error.split(',').join('\n')}</div> : null}
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
              <button name="signup" className={`btn btn-warning btn-sm ${url === '/signup' ? 'show' : 'hidden' }`}  >Sign Up</button>
              <button name="login" className={`btn btn-success btn-sm ${url === '/login' || url === '/admin' ? 'show' : 'hidden' }`}>Log In</button>
              {' '}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({error, cart}) => {
  return {
    error,
    cart
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUpUser: (credentials, cart) => {
      dispatch(createUser(credentials, ownProps.history, cart));
    },
    startUserSession: (credentials, cart) => {
      dispatch(loginUser(credentials, ownProps.history, cart));
    },
    clearError: () => {
      dispatch(setError(''));
    },
    loginError: () => {
      dispatch(setError('Please log in'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm);
