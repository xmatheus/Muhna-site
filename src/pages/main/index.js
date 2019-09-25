import React from 'react';
import './styles.css';

import api from '../services/api';

import { withRouter } from 'react-router-dom';

import { login, saveData } from '../services/auth';

/* barra de progresso */

// import LinearIndeterminate from './bar';

import { LineScale } from 'react-pure-loaders';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', logado: false, conta: 0 };
    }

	handleChangeEmail = event => {
	    this.setState({ email: event.target.value });
	};

	handleChangePasswd = event => {
	    this.setState({ password: event.target.value });
	};

	addEfeitoDeErro = () => {
	    const formLogin = document.querySelector('.login');
	    formLogin.classList.add('validade-error');
	    // document.querySelector('.login').style.border = '1px solid red';
	    const formError = document.querySelector('.validade-error');
	    if (formError) {
	        formError.addEventListener('animationend', event => {
	            if (event.animationName === 'nono') {
	                this.setState({ error: 'email ou senha inválidos' });
	                formError.classList.remove('validade-error');
	            }
	        });
	    }
	};
	componentDidMount = () => {
	    document.querySelector('.login').addEventListener('keypress', event => {
	        if (event.keyCode === 13) {
	            event.preventDefault();
	            document.querySelector('button').click();
	        }
	    });
	};

	enviar = async () => {
	    this.setState({ enviar: 1 });
	    // this.conta();
	    document.querySelector('.main-form').style.cursor = 'wait';
	    const { email, password } = this.state;

	    api.post('/auth/authenticate', {
	        email: email,
	        password: password
	    })
	        .then(async response => {
	            const { token, user } = response.data;
	            login(token);
	            saveData(user);
	            this.setState({ enviar: null });
	            this.props.history.push('/dashboard');
	        })
	        .catch(error => {
	            this.setState({ enviar: null });
	            document.querySelector('.main-form').style.cursor = 'default';
	            this.addEfeitoDeErro();
	            console.log(error);
	        });
	};

	render() {
	    return (
	        <div className="main-form">
	            <div className="login">
	                <h1>Login</h1>

	                {this.state.error ? <p>{this.state.error}</p> : null}
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
	                <button type="submit" onClick={this.enviar}>
						Enviar
	                </button>
	                <LineScale color={'#fff'} loading={this.state.enviar} />
	            </div>
	        </div>
	    );
	}
}

export default withRouter(Main);
