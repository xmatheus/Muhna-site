import React from 'react';

import api from '../services/api';

import { withRouter } from 'react-router-dom';

import { login, saveData } from '../services/auth';

/* barra de progresso */

import { LineScale } from 'react-pure-loaders';

import {
    Container,
    ContainerLogin,
    ContainerChangePassword
} from './styles.js';

import './styles.css';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', logado: false, conta: 0 };
    }

	EffectCubo = () => {
	    /* background squares */
	    const ulSquares = document.querySelector('ul.squaresMain');

	    for (let i = 0; i < 13; i++) {
	        const li = document.createElement('li');

	        const random = (min, max) => Math.random() * (max - min) + min;

	        const size = Math.floor(random(10, 120));
	        const position = random(1, 99);
	        const delay = random(5, 0.1);
	        const duration = random(24, 12);

	        li.style.width = `${size}px`;
	        li.style.height = `${size}px`;
	        li.style.bottom = `-${size}px`;

	        li.style.left = `${position}%`;

	        li.style.animationDelay = `${delay}s`;
	        li.style.animationDuration = `${duration}s`;
	        li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

	        ulSquares.appendChild(li);
	    }
	};

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
	                this.setState({ error: 'Email ou senha inválidos' });

	                setTimeout(() => this.setState({ error: undefined }), 5000);
	                formError.classList.remove('validade-error');
	            }
	        });
	    }
	};
	componentDidMount = () => {
	    //aperta enter ela envia o email e senha
	    document.querySelector('.login').addEventListener('keypress', event => {
	        if (event.keyCode === 13) {
	            event.preventDefault();
	            document.getElementById('buttonSend').click();
	        }
	    });

	    this.EffectCubo();
	};

	enviar = async () => {
	    this.setState({ enviar: 1 });
	    // this.conta();
	    // document.querySelector('.main-form').style.cursor = 'wait';
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
	            // document.querySelector('.main-form').style.cursor = 'default';
	            // this.addEfeitoDeErro();

	            this.setState({ error: 'Email ou senha inválidos' });

	            setTimeout(() => this.setState({ error: undefined }), 5000);

	            this.setState({ incorrect: true });

	            setTimeout(() => {
	                this.setState({ incorrect: false });
	            }, 3000);

	            console.log(error);
	        });
	};

	render() {
	    return (
	        <Container>
	            <ContainerLogin
	                className={`input ${
	                    this.state.incorrect ? 'login validade-error' : 'login'
	                }`}
	            >
	                <h1>Login</h1>

	                {this.state.error ? <p>{this.state.error}</p> : null}
	                <form onSubmit={() => {}}>
	                    <label>Email</label>
	                    <input
	                        type="text"
	                        value={this.state.email}
	                        onChange={this.handleChangeEmail}
	                    />
	                </form>

	                <form onSubmit={() => {}}>
	                    <label>Senha</label>

	                    <input
	                        type="password"
	                        ref={input => {
	                            this.passwordInput = input;
	                        }}
	                        value={this.state.password}
	                        onChange={this.handleChangePasswd}
	                    />
	                </form>
	                <ContainerChangePassword>
	                    <button
	                        onClick={() => {
	                            this.props.history.push('/forgot_password');
	                        }}
	                    >
	                        {' '}
							Recuperar senha
	                    </button>
	                </ContainerChangePassword>
	                <button id="buttonSend" type="submit" onClick={this.enviar}>
						Enviar
	                </button>
	                <LineScale color={'#fff'} loading={this.state.enviar} />
	            </ContainerLogin>
	            <ul className="squaresMain"></ul>
	        </Container>
	    );
	}
}

export default withRouter(Main);
