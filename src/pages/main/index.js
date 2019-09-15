import React from 'react';
import './styles.css';

import api from '../services/api';

import { withRouter } from 'react-router-dom';

import { login } from '../services/auth';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', logado: false };
    }

	handleChangeEmail = event => {
	    this.setState({ email: event.target.value });
	};

	handleChangePasswd = event => {
	    this.setState({ password: event.target.value });
	};

	enviar = async () => {
	    this.passwordInput.type = 'text';
	    const { email, password } = this.state;

	    api.post('/auth/authenticate', {
	        email: email,
	        password: password
	    })
	        .then(async response => {
	            const { token } = response.data;

	            login(token);
	            this.props.history.push('/dashboard');
	        })
	        .catch(error => {
	            console.log(error);
	        });
	};

	render() {
	    return (
	        <div className="main-form">
	            <div className="login">
	                <h1>Login</h1>
	                <form id="formOne" onSubmit={() => {}}>
	                    <label>email</label>
	                    <input
	                        type="text"
	                        value={this.state.email}
	                        onChange={this.handleChangeEmail}
	                    />
	                </form>

	                <form id="formTwo" onSubmit={() => {}}>
	                    <label>senha</label>

	                    <input
	                        type="password"
	                        ref={input => {
	                            this.passwordInput = input;
	                        }}
	                        value={this.state.password}
	                        onChange={this.handleChangePasswd}
	                    />
	                </form>
	                <button onClick={this.enviar}>Enviar</button>
	            </div>
	        </div>
	    );
	}
}

export default withRouter(Main);
