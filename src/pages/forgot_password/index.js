import React from 'react';

import api from '../services/api';

import { withRouter } from 'react-router-dom';

import swal from '@sweetalert/with-react';

import { LineScale } from 'react-pure-loaders';

import {
    Container,
    ContainerLogin,
    ErroLabel,
    ContainerButtons
} from './styles.js';

import './styles.css';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', logado: false, sucess: false };
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

	handleChangeToken = event => {
	    this.setState({ token: event.target.value });
	};

	handleChangePassword = event => {
	    this.setState({ password: event.target.value });
	};

	handleChangeRePassword = event => {
	    this.setState({ rePassword: event.target.value });
	};

	componentDidMount = () => {
	    //aperta enter ela envia o email e senha
	    document
	        .querySelector('.loginContainer')
	        .addEventListener('keypress', event => {
	            if (event.keyCode === 13) {
	                event.preventDefault();
	            }
	        });

	    this.EffectCubo();
	};

	enviar = () => {
	    this.setState({ enviar: 1 });

	    const { email } = this.state;

	    api.post('/auth/forgot_password', {
	        email: email
	    })
	        .then(response => {
	            if (response.status !== 200) {
	                this.addEfeitoDeErroDiv();
	                this.setState({ enviar: null });
	            } else {
	                this.setState({
	                    enviar: null,
	                    sucess: true,
	                    messageSucess: true
	                });
	            }
	        })
	        .catch(error => {
	            this.addEfeitoDeErroDiv();
	            console.log(error);
	            this.setState({ enviar: null });
	        });
	};

	addEfeitoDeErroDiv = () => {
	    const formLogin = document.querySelector('.loginContainer');

	    formLogin.classList.add('validade-error');
	    const formError = document.querySelector('.validade-error');
	    console.log('DE');
	    if (formError) {
	        console.log('bug');
	        formError.addEventListener('animationend', event => {
	            console.log('fim animation');
	            if (event.animationName === 'nono') {
	                this.setState({
	                    error: 'Nâo foi possível enviar o token para esse email'
	                });

	                setTimeout(() => this.setState({ error: undefined }), 5000);
	                formError.classList.remove('validade-error');
	            }
	        });
	    }
	};

	popupDeuCerto = () => {
	    swal('Deu certo :)', 'Senha trocada', 'success').then(sucess => {
	        if (sucess) {
	            this.props.history.push('/');
	        }
	    });
	};

	popupDeuErrado = () => {
	    swal('Error', 'Senha não rocada', 'error');
	};

	changePassowrd = () => {
	    const { email, password, rePassword, token } = this.state;

	    if (!token) {
	        this.addEfeitoDeErro(this.inputToken);
	    }

	    if (!password) {
	        this.addEfeitoDeErro(this.inputPassword);
	    }

	    if (!rePassword) {
	        this.addEfeitoDeErro(this.inputRePassword);
	    }
	    if (password !== rePassword) {
	        this.addEfeitoDeErro(this.inputRePassword);
	        this.setState({ diferentPassword: true });

	        setTimeout(() => {
	            this.setState({ diferentPassword: false });
	        }, 3000);
	    } else if (token) {
	        this.setState({ enviar: true });
	        api.post('/auth/reset_password', {
	            email,
	            password,
	            token
	        })
	            .then(res => {
	                if (res.status !== 200) {
	                    console.log(res);
	                    this.setState({ enviar: false });
	                    this.popupDeuErrado();
	                } else {
	                    this.setState({ enviar: false });
	                    this.popupDeuCerto();
	                }
	            })
	            .catch(err => {
	                console.log(err);
	                this.setState({ enviar: false });
	                this.popupDeuErrado();
	            });
	    }
	};

	addEfeitoDeErro = input => {
	    input.classList.add('validade-error-user');

	    input.style.border = '2px solid rgb(255,0,0)';

	    setTimeout(() => {
	        input.style.border = '1px solid rgb(44, 25, 2)';
	    }, 2500);

	    input.addEventListener('animationend', event => {
	        if (event.animationName === 'nonoUser') {
	            input.classList.remove('validade-error-user');
	        }
	    });
	};

	render() {
	    return (
	        <Container>
	            <ContainerLogin className="loginContainer">
	                <h1>Alterar senha</h1>

	                {this.state.error && <p>{this.state.error}</p>}

	                {!this.state.sucess && (
	                    <form onSubmit={() => {}}>
	                        <label>Email</label>
	                        <input
	                            type="text"
	                            value={this.state.email}
	                            onChange={this.handleChangeEmail}
	                        />
	                    </form>
	                )}

	                {this.state.sucess && (
						<>
							{this.state.messageSucess && (
							    <h3>O Token foi enviado no email.</h3>
							)}
							<form onSubmit={() => {}}>
							    <label>token</label>

							    <input
							        type="text"
							        ref={ref => {
							            this.inputToken = ref;
							        }}
							        value={this.state.token}
							        onChange={this.handleChangeToken}
							    />

							    <label>senha</label>

							    <input
							        type="password"
							        ref={ref => {
							            this.inputPassword = ref;
							        }}
							        value={this.state.password}
							        onChange={this.handleChangePassword}
							    />

							    <label>Repita a senha</label>

							    <input
							        type="password"
							        ref={ref => {
							            this.inputRePassword = ref;
							        }}
							        value={this.state.rePassword}
							        onChange={this.handleChangeRePassword}
							    />

							    {this.state.diferentPassword && (
							        <ErroLabel>
										As senhas estão diferentes
							        </ErroLabel>
							    )}
							</form>
						</>
	                )}

	                <ContainerButtons className="loginDiv">
	                    <button
	                        onClick={() => {
	                            this.props.history.push('/');
	                        }}
	                    >
							Cancelar
	                    </button>
	                    {this.state.sucess ? (
	                        <button
	                            id="ButtonEnviar"
	                            type="submit"
	                            onClick={this.changePassowrd}
	                        >
								Enviar
	                        </button>
	                    ) : (
	                        <button
	                            id="ButtonEnviar"
	                            type="submit"
	                            onClick={this.enviar}
	                        >
								Enviar
	                        </button>
	                    )}
	                </ContainerButtons>
	                <LineScale color={'#fff'} loading={this.state.enviar} />
	            </ContainerLogin>
	            <ul className="squaresMain"></ul>
	        </Container>
	    );
	}
}

export default withRouter(ForgotPassword);
