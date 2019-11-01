import React, { Component } from 'react';

import {
    Container,
    Loading,
    ErroLabel,
    SubContainer,
    DefaultLabel,
    ContainerCheckBox,
    ContainerButtonSendUSer,
    PacmanLoad
} from './styles';

import { Pacman } from 'react-pure-loaders';

import Checkbox from '@material-ui/core/Checkbox';

import swal from '@sweetalert/with-react';

import '../../stylesRetangulo/styles.css';

import './styles.css';

import api from '../../../services/api';

export default class UserCreate extends Component {
	state = {
	    onScreen: false,
	    nameError: false,
	    emailError: false,
	    isAdmin: false,
	    name: undefined,
	    email: undefined,
	    password: undefined,
	    repassword: undefined
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);
	};

	EffectCubo = () => {
	    /* background squares */
	    const ulSquares = document.querySelector('ul.squares');

	    for (let i = 0; i < 17; i++) {
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

	handleChangeName = event => {
	    const name = event.target.value;

	    if (name.length >= 60) {
	        this.inputRefName.style.border = '1px solid rgb(255,0,0)';
	        this.setState({ nameError: true });

	        setTimeout(() => {
	            this.inputRefName.style.border = '1px solid rgb(44, 25, 2)';
	            this.setState({ nameError: false });
	        }, 2000);
	    } else {
	        this.setState({ name });
	    }
	};

	handleChangeEmail = event => {
	    const email = event.target.value;

	    if (email.length >= 60) {
	        this.inputRefEmail.style.border = '1px solid rgb(255,0,0)';
	        this.setState({ emailError: true });

	        setTimeout(() => {
	            this.inputRefEmail.style.border = '1px solid rgb(44, 25, 2)';
	            this.setState({ emailError: false });
	        }, 2000);
	    } else {
	        this.setState({ email });
	    }
	};

	handleChangePassword = event => {
	    const password = event.target.value;

	    if (password.length >= 60) {
	        this.inputRefEmail.style.border = '1px solid rgb(255,0,0)';
	        this.setState({ passwordError: true });

	        setTimeout(() => {
	            this.inputRefEmail.style.border = '1px solid rgb(44, 25, 2)';
	            this.setState({ passwordError: false });
	        }, 2000);
	    } else {
	        this.setState({ password });
	    }
	};

	handleChangeRePassword = event => {
	    const repassword = event.target.value;
	    this.setState({ repassword });
	};

	handleChangeCheckbox = e => {
	    this.setState({ isAdmin: e.target.checked });
	};

	popupDeuCerto = () => {
	    swal('Sucesso', 'Usuário criado :)', 'success');
	};

	popupDeuErrado = () => {
	    swal(
	        'Error',
	        'Usuário não criado, você tem certeza que esse email não está cadastrado?\nCaso persista, tente fazer login novamente.',
	        'error'
	    );
	};

	clearInputs = () => {
	    this.setState({
	        name: undefined,
	        email: undefined,
	        password: undefined,
	        repassword: undefined,
	        isAdmin: false
	    });

	    this.inputRefEmail.value = '';
	    this.inputRefName.value = '';
	    this.inputRefPassword.value = '';
	    this.inputRefRePassword.value = '';
	    this.refCheckbox.value = 'A';
	};

	enviar = () => {
	    const { password, repassword, name, email, isAdmin } = this.state;

	    if (!name) {
	        this.addEfeitoDeErro(this.inputRefName);
	    }

	    if (!email) {
	        this.addEfeitoDeErro(this.inputRefEmail);
	    }

	    if (!password) {
	        this.addEfeitoDeErro(this.inputRefPassword);
	    }

	    if (!repassword) {
	        this.addEfeitoDeErro(this.inputRefRePassword);
	    }
	    if (password !== repassword) {
	        this.addEfeitoDeErro(this.inputRefRePassword);
	        this.setState({ diferentPassword: true });

	        setTimeout(() => {
	            this.setState({ diferentPassword: false });
	        }, 2000);
	    } else if (name && email) {
	        this.setState({ enviar: true });
	        api.post('/auth/register', {
	            name,
	            email,
	            password,
	            isAdmin
	        })
	            .then(res => {
	                if (res.status !== 200) {
	                    console.log(res);
	                    this.clearInputs();
	                    this.setState({ enviar: false });
	                    this.popupDeuErrado();
	                } else {
	                    this.clearInputs();
	                    this.setState({ enviar: false });
	                    this.popupDeuCerto();
	                }
	            })
	            .catch(err => {
	                console.log(err);
	                this.clearInputs();
	                this.setState({ enviar: false });
	                this.popupDeuErrado();
	            });
	    }
	};

	addEfeitoDeErro = input => {
	    input.classList.add('validade-error');

	    input.style.border = '2px solid rgb(255,0,0)';

	    setTimeout(() => {
	        input.style.border = '1px solid rgb(44, 25, 2)';
	    }, 2500);

	    input.addEventListener('animationend', event => {
	        if (event.animationName === 'nono') {
	            input.classList.remove('validade-error');
	        }
	    });
	};

	render() {
	    return (
			<>
				<link
				    rel="stylesheet"
				    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
				    rel="stylesheet"
				    href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				{!this.state.onScreen ? (
				    <Loading>
				        <Pacman color={'#3f2306'} loading={true} />
				    </Loading>
				) : (
				    <Container>
				        <SubContainer>
				            <form>
				                <DefaultLabel>Nome</DefaultLabel>
				                {this.state.nameError && (
				                    <ErroLabel> tá muito grande</ErroLabel>
				                )}
				                <br></br>
				                <input
				                    ref={ref => (this.inputRefName = ref)}
				                    value={this.state.name}
				                    type="text"
				                    name="nome"
				                    maxLength="60"
				                    placeholder="no máximo 60 caracteres"
				                    onChange={this.handleChangeName}
				                    required
				                />

				                <DefaultLabel>Email</DefaultLabel>
				                {this.state.emailError && (
				                    <ErroLabel> tá muito grande</ErroLabel>
				                )}
				                <br></br>
				                <input
				                    value={this.state.email}
				                    ref={ref => (this.inputRefEmail = ref)}
				                    type="text"
				                    name="email"
				                    maxLength="60"
				                    placeholder="Ex: muhna@muhna.com"
				                    onChange={this.handleChangeEmail}
				                    required
				                />

				                <DefaultLabel>Senha</DefaultLabel>
				                {this.state.passwordError && (
				                    <ErroLabel> tá muito grande</ErroLabel>
				                )}
				                <br></br>
				                <input
				                    value={this.state.password}
				                    ref={ref => (this.inputRefPassword = ref)}
				                    type="password"
				                    name="password"
				                    maxLength="60"
				                    placeholder="Tente colocar uns #%$ e letras maiúsculas e minúsculas"
				                    onChange={this.handleChangePassword}
				                    required
				                />

				                <DefaultLabel>
									Digite novamente a Senha
				                </DefaultLabel>
				                {this.state.repasswordError && (
				                    <ErroLabel> tá muito grande</ErroLabel>
				                )}
				                <br></br>
				                <input
				                    value={this.state.repassword}
				                    ref={ref => (this.inputRefRePassword = ref)}
				                    type="password"
				                    name="repassword"
				                    maxLength="60"
				                    placeholder=" Tente não colocar '123' 'data de nascimento'..."
				                    onChange={this.handleChangeRePassword}
				                    required
				                />
				                <br></br>
				                {this.state.diferentPassword && (
				                    <ErroLabel>
										As senhas estão diferentes
				                    </ErroLabel>
				                )}
				            </form>
				            <ContainerCheckBox>
				                <DefaultLabel>
									Esse usuário vai ser um administrador(poderá
									adc e remover usuários)?
				                </DefaultLabel>
				                <Checkbox
				                    ref={ref => (this.refCheckbox = ref)}
				                    checked={this.state.isAdmin}
				                    onChange={this.handleChangeCheckbox}
				                    value={this.state.isAdmin}
				                    color="primary"
				                    inputProps={{
				                        'aria-label': 'secondary checkbox'
				                    }}
				                />
				            </ContainerCheckBox>

				            <ContainerButtonSendUSer>
				                <PacmanLoad>
				                    {this.state.enviar ? (
				                        <Pacman
				                            color={'#3f2306'}
				                            loading={true}
				                        />
				                    ) : null}
				                </PacmanLoad>

				                <button
				                    onClick={() => {
				                        this.enviar();
				                    }}
				                >
									enviar
				                </button>
				            </ContainerButtonSendUSer>
				        </SubContainer>

				        <ul className="squares"></ul>
				    </Container>
				)}
			</>
	    );
	}
}
