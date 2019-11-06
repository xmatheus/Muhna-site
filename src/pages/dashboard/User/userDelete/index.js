import React, { Component } from 'react';

import { Pacman } from 'react-pure-loaders';

import swal from '@sweetalert/with-react';

import { MdDateRange, MdPerson, MdDelete, MdMail } from 'react-icons/md';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Lottie from 'react-lottie';

import {
    TitleAllUsers,
    ContainerLi,
    ContainerVertical,
    ContainerIconsHorizontal,
    ContainerDeleteButton,
    ContainerButtonProxAndBack,
	ContainerHorizontal,
	LabelPages
} from './styles';

import {
    Container,
    SubContainer,
    PacmanLoad,
    Loading
} from '../../StyledComponentsDashboard/styles'; //estilos usados por varias telas

import '../../stylesRetangulo/styles.css';

import api from '../../../services/api';

import { login, saveData } from '../../../services/auth';

export default class UserDelete extends Component {
	state = {
	    onScreen: false,
		page: 1,
		searchActive:false
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);

	    this.getUsers(this.state.page);
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

	deletePost = id => {
	    api.delete(`/auth?userId=${id}`)
	        .then(response => {
	            if (response.status !== 200) {
	                console.log(response.status);
	                this.deuErro();
	                return;
	            }

	            swal('Sucesso', 'O usuário foi excluido!', 'success');
	            this.removeFromState(id);
	            this.getUsers(1);
	        })
	        .catch(erro => {
	            this.deuErro();
	        });

	    this.getUsers(1);
	};

	deuErro = () => {
	    swal({
	        title: 'Opa, problemas :|',
	        content: (
	            <div id="div-input-popup-main">
	                <div id="div-input-popup">
	                    <label>email</label>
	                    <input
	                        type="text"
	                        onChange={this.handleChangeEmail}
	                    ></input>
	                    <label>senha</label>
	                    <input
	                        type="password"
	                        onChange={this.handleChangePasswd}
	                    ></input>
	                </div>
	            </div>
	        ),
	        text: 'Sua sessão deve ter chagado ao fim, faça login novamente.',
	        icon: 'warning',
	        button: {
	            text: 'Fazer login',
	            closeModal: false
	        },
	        dangerMode: true
	    }).then(option => {
	        if (option) {
	            this.loginEnviar();
	            this.getUsers(); // caso tenha duas sessões e alguém exclua um usuário
	        }
	    });
	};

	loginEnviar = () => {
	    const { email, password } = this.state;

	    api.post('/auth/authenticate', {
	        email: email,
	        password: password
	    })
	        .then(response => {
	            const { token, user } = response.data;
	            login(token);
	            saveData(user);
	            swal.stopLoading();
	            this.loginFeito();
	        })
	        .catch(() => {
	            this.erroLogin();
	            swal.stopLoading();
	        });
	};

	loginFeito = () => {
	    swal('Sucesso', 'login feito, sua sessão foi restaurada.', 'success');
	};

	erroLogin = () => {
	    swal(
	        'Error no login',
	        'sua sessão não foi restaurada. \nAlterações/envios/remoções não serão concluidas enquanto o login não for feito.',
	        'error'
	    );
	};

	handleChangeEmail = event => {
	    this.setState({ email: event.target.value });
	};

	handleChangePasswd = event => {
	    this.setState({ password: event.target.value });
	};

	removeFromState = id => {
	    this.setState({
	        docs: this.state.docs.filter(docs => docs._id !== id)
	    });
	};

	getUsers = async (page = 1) => {
	    try {
	        const response = await api.get(`/auth?page=${page}&limite=5`);

	        const { docs, ...pages } = response.data;

	        this.setState({ docs, pages, page });
	    } catch (error) {
	        this.noInternet();
	    }
	};

	noInternet = () => {
	    swal({
	        content: (
	            <div>
	                <h1>:( deu erro</h1>
	                <br />
	                <br />
	                <p>você está conectado a internet?</p>
	            </div>
	        ),
	        buttons: {
	            catch: {
	                text: 'fechar',
	                value: 1
	            }
	        }
	    });
	};

	ArrumaData = data => {
	    return data.substring(0, 10);
	};

	back = () => {
	    let { page } = this.state;

	    if (page === 1) {
	        return;
	    } else {
	        page -= 1;
	        this.setState({ docs: null });
	        this.getUsers(page);
	    }
	};

	prox = () => {
	    let { pages, page } = this.state;

	    if (page === pages.pages) {
	        return;
	    } else {
	        page += 1;
	        this.setState({ docs: null });
	        this.getUsers(page);
	    }
	};

	changeInput = async e => {
	    const value = e.target.value;
	    this.setState({ value });

	    if (value.length > 0) {
	        this.setState({ searchActive: true });
	        const response = await api.post(`/auth/search?name=${value}`);

	        const { users } = response.data;

	        this.setState({ docs: users });
	    } else {
	        this.setState({ searchActive: false });
	        this.getUsers(this.state.page);
	    }
	};

	PopupDeelete = id => {
	    swal({
	        title: 'Exluir usuário',
	        text: 'Tem certeza de que deseja excluir esse usuário?',
	        icon: 'warning',
	        buttons: ['cancelar', 'apagar'],
	        dangerMode: true
	    }).then(willDelete => {
	        if (willDelete) {
	            this.deletePost(id);
	        }
	    });
	};

	render() {
	    const { pages, page } = this.state;

	    const admin = {
	        loop: true,
	        autoplay: true,
	        animationData: require('../../../../assets/ninja.json'),
	        rendererSettings: {
	            preserveAspectRatio: 'xMidYMid slice'
	        },
	        resizeMode: true
	    };

	    const notAdmin = {
	        loop: true,
	        autoplay: true,
	        animationData: require('../../../../assets/carinha.json'),
	        rendererSettings: {
	            preserveAspectRatio: 'xMidYMid slice'
	        },
	        resizeMode: true
	    };
	    return (
			<>
				{!this.state.onScreen ? (
				    <Loading>
				        <Pacman color={'#3f2306'} loading={true} />
				    </Loading>
				) : (
				    <Container>
				        <SubContainer>
				            <div>
				                <br />
				                <input
				                    value={this.state.value}
				                    type="text"
				                    onChange={this.changeInput}
				                    placeholder="Digite o nome do usuário"
				                    onBlur={() => {
				                        setTimeout(() => {
				                            this.getUsers(this.state.page);
				                            this.setState({
				                                searchActive: false
				                            });
				                        }, 100);
				                    }}
				                />
				                <br />
				                <br />
				            </div>

				            {this.state.docs ? (
								<>
									{this.state.docs.length ? (
										<>
											{!this.state.searchActive ? (
												<>
													<TitleAllUsers>
													    <h2>
															Ou veja todos os
															usuários
													    </h2>
													</TitleAllUsers>
												</>
											) : null}

											<div>
											    <ContainerLi>
											        <ReactCSSTransitionGroup
											            transitionName="example"
											            transitionEnterTimeout={
											                400
											            }
											            transitionLeaveTimeout={
											                200
											            }
											        >
											            {this.state.docs.map(
											                user => (
											                    <ContainerHorizontal>
											                        {user.isAdmin ? (
											                            <Lottie
											                                options={
											                                    admin
											                                }
											                                height={
											                                    '20%'
											                                }
											                                width={
											                                    '10%'
											                                }
											                                isStopped={
											                                    false
											                                }
											                                isPaused={
											                                    false
											                                }
											                            />
											                        ) : (
											                            <Lottie
											                                options={
											                                    notAdmin
											                                }
											                                height={
											                                    '20%'
											                                }
											                                width={
											                                    '10%'
											                                }
											                                isStopped={
											                                    false
											                                }
											                                isPaused={
											                                    false
											                                }
											                            />
											                        )}
											                        <li
											                            key={
											                                user._id
											                            }
											                        >
											                            <ContainerVertical>
											                                <div>
											                                    <h4>
											                                        {user.name ||
																						'"sem nome"'}
											                                    </h4>
											                                    <ContainerIconsHorizontal>
											                                        <MdDateRange
											                                            size={
											                                                15
											                                            }
											                                            style={{
											                                                paddingRight:
																								2 +
																								'px'
											                                            }}
											                                        />
											                                        <span>
											                                            {user.createAt
											                                                ? this.ArrumaData(
											                                                    user.createAt
																							  )
											                                                : null}
											                                        </span>
											                                    </ContainerIconsHorizontal>
											                                </div>
											                                <ContainerIconsHorizontal>
											                                    <MdPerson
											                                        size={
											                                            15
											                                        }
											                                        style={{
											                                            paddingRight:
																							2 +
																							'px'
											                                        }}
											                                    />
											                                    <span>
											                                        {user.isAdmin
											                                            ? 'admin'
											                                            : 'não é admin'}
											                                    </span>
											                                </ContainerIconsHorizontal>

											                                <ContainerIconsHorizontal>
											                                    <MdMail
											                                        size={
											                                            15
											                                        }
											                                        style={{
											                                            paddingRight:
																							2 +
																							'px'
											                                        }}
											                                    />
											                                    <span>
											                                        {
											                                            user.email
											                                        }
											                                    </span>
											                                </ContainerIconsHorizontal>
											                            </ContainerVertical>
											                            <ContainerDeleteButton
											                                onClick={() => {
											                                    this.PopupDeelete(
											                                        user._id
											                                    );
											                                }}
											                            >
											                                <MdDelete
											                                    size={
											                                        35
											                                    }
											                                    color="#b60202"
											                                />
											                            </ContainerDeleteButton>
											                        </li>
											                    </ContainerHorizontal>
											                )
											            )}
											        </ReactCSSTransitionGroup>
											    </ContainerLi>
											</div>
											{!this.state.searchActive ? (
											    <LabelPages>
											        <p>
											            {page +
															'/' +
															pages.pages}
											        </p>
											    </LabelPages>
											) : null}
											<ContainerButtonProxAndBack>
											    <button
											        disabled={page === 1}
											        onClick={this.back}
											    >
													Voltar
											    </button>
											    <button
											        disabled={
											            page === pages.pages
											        }
											        onClick={this.prox}
											    >
													Próximo
											    </button>
											</ContainerButtonProxAndBack>
										</>
									) : (
										<>
											<h2>Nenhum usuário encontrada</h2>
										</>
									)}
								</>
				            ) : (
				                <PacmanLoad>
				                    <Pacman color={'#3f2306'} loading={true} />
				                </PacmanLoad>
				            )}
				        </SubContainer>

				        <ul className="squares"></ul>
				    </Container>
				)}
			</>
	    );
	}
}
