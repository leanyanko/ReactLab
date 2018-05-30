import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                userName: '',
                password: ''
            },
            redirect: false
        };
        
    }

    handleChange = (e) => {
        const updatedUser = {...this.state.user};
        const inputField = e.target.name;
        const inputValue = e.target.value;
        updatedUser[inputField] = inputValue;

        this.setState({ user: updatedUser });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.mockLogIn(this.state.user)
        this.setState({redirect: true})
      }

    render() {

        return (<div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName} />
                </div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />

                <div>
                </div>
                <button>Login</button>
            </form>
            {this.state.redirect ? <Redirect to="/userProfile" /> : ''}
        </div>);
    }
}

export default LogIn;