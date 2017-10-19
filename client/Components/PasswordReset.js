import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser, loginUser, setError} from '../store';

class LoginSignupForm extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: ''
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
    const {authUser} = this.props;
    const user = Object.assign({}, authUser, this.state);
    this.props.handleUserUpdate(user);
    this.setState({currentPassword: '', newPassword: '', newPasswordCheck: ''});
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
    const {currentPassword, newPassword, newPasswordCheck} = this.state;
    const {error, authUser} = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form className="well" onSubmit={onSubmit}>
          <div className="alert alert-info">Hello {authUser.name.slice(0, authUser.name.indexOf(' '))}, please update your password.</div>
          {error.length > 0 ? <div className="alert alert-danger">{error.split(',').join('\n')}</div> : null}
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input onChange={onChange} name="currentPassword" className="form-control" type="password" value={currentPassword} />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input onChange={onChange} name="newPassword" className="form-control" type="password" value={newPassword} />
            </div>
            <div className="form-group">
              <label htmlFor="newPasswordCheck">New Password Check</label>
              <input onChange={onChange} name="newPasswordCheck" className="form-control" type="password" value={newPasswordCheck} />
            </div>
              <button name="changePassword" className="btn btn-warning btn-sm" >Change Password</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({error, authUser}) => {
  return {
    error,
    authUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleUserUpdate: (user) => {
      dispatch(updateUser(user, ownProps.history));
    },
    startUserSession: (credentials) => {
      dispatch(loginUser(credentials, ownProps.history));
    },
    clearError: () => {
      dispatch(setError(''));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm);
