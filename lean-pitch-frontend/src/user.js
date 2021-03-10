import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// import { useHistory } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
        this.login = this.login.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.closeError = this.closeError.bind(this);
    }
    login() {
        console.log('username: ', this.state.username);
        console.log('password: ', this.state.password);
        const request = {
            email: this.state.username,
            password: this.state.password
        };
        axios.post('http://localhost:9999/login', (request), { withCredentials: true }).then(res => {
            alert('Logged in')
            window.location.pathname = '/';
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Invalid! email OR password'
            });
        });
    }
    updateUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }
    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }
    closeError() {
        this.setState({
            errorMessage: ''
        });
    }
    render() {
        return (
            <div className="App container">
                {
                    (this.state.errorMessage !== '')
                        ? <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                            <strong>Error! </strong> {this.state.errorMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeError}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> :
                        null
                }
                <h1>Welcome</h1>
                
                <div className="row my-2 mt-5">
                    <div className="col-sm">
                        <input type="text" value={this.state.username} onChange={this.updateUsername} className="form-control" placeholder="Email Id" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" placeholder="Password" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-right">
                        <button className="btn btn-sm btn-success" onClick={this.login}>Log In</button>
                    </div>
                    {/* New User? &nbsp;<Link to={'/signup'} className="btn btn-primary btn-sm">Register</Link> */}
                </div>
            </div>
        );
    }
}

export default Login;