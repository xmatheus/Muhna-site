import React, { Component } from 'react';

// import { Container } from './styles';\
import './styles.css';

import { Pacman } from 'react-pure-loaders';

import EditorText from '../../../../editorText';

import api from '../../../../services/api';

import swal from '@sweetalert/with-react';

import UploadFiles from '../../uploadFiles';

import { login, saveData } from '../../../../services/auth';
export default class PostsCreateChanged extends Component {
	state = {
	    onScreen: false,
	    enviar: false,
	    proxPag: false,
	    title: this.props.title,
	    post: this.props.post,
	    error: false
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	    }, 100);
	};

	handleChangeTitle = event => {
	    this.setState({ title: event.target.value });
	};

	handleChangePosts = post => {
	    this.setState({ post });
	};

	handleChangeEmail = event => {
	    this.setState({ email: event.target.value });
	};

	handleChangePasswd = event => {
	    this.setState({ password: event.target.value });
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
	        }
	    });
	};

	postagemAlterada = () => {
	    swal('Sucesso', 'A notícia foi alterada!', 'success');
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

	enviar = () => {
	    this.setState({ enviar: true });

	    setTimeout(() => {
	        const { title, post } = this.state;
	        api.put(`post/update?postid=${this.props.postid}`, {
	            title,
	            post
	        })
	            .then(response => {
	                const { _id, status } = response.data;
	                this.setState({ postid: _id });
	                if (status === 401) {
	                    this.deuErro();
	                }
	                console.log('-> postagem alterada');
	                this.setState({ enviar: false });
	                this.changeEffect();
	                this.postagemAlterada();
	                setTimeout(() => {
	                    this.setState({ proxPag: true });
	                }, 100);
	            })
	            .catch(error => {
	                this.setState({ enviar: false });
	                this.deuErro();
	            });
	    }, 200);
	};

	changeEffect = () => {
	    const formOne = document.querySelector('.sub-div-post');
	    formOne.classList.add('class-rightToLeft');
	    const formError = document.querySelector('.class-rightToLeft');
	    if (formError) {
	        formError.addEventListener('animationend', event => {
	            if (event.animationName === 'rightToLeft') {
	                formError.classList.remove('class-rightToLeft');
	            }
	        });
	    }
	};

	backPag = () => {
	    this.setState({ proxPag: false });
	};

	render() {
	    return (
			<>
				{!this.state.onScreen ? (
				    <div className="main-Posts-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="main-Posts">
				        {!this.state.proxPag ? (
				            <div className="sub-div-post">
				                <form>
				                    <label>Titulo</label>
				                    <br></br>
				                    <input
				                        value={this.state.title}
				                        type="text"
				                        name="titulo"
				                        maxLength="60"
				                        onChange={this.handleChangeTitle}
				                    />
				                </form>
				                <div className="editor-text">
				                    <EditorText
				                        onChange={this.handleChangePosts}
				                        html={this.props.post}
				                    ></EditorText>
				                </div>
				                <div className="button-div">
				                    <div id="pacmanLoad">
				                        {this.state.enviar ? (
				                            <Pacman
				                                color={'#3f2306'}
				                                loading={true}
				                            />
				                        ) : null}
				                    </div>

				                    <button
				                        onClick={() => {
				                            this.enviar();
				                        }}
				                    >
										próximo
				                    </button>
				                </div>
				            </div>
				        ) : (
				            <div className="proxPage">
				                <h1>Adicionar mídia a notícia</h1>
				                <UploadFiles
				                    postid={this.props.postid}
				                ></UploadFiles>
				                <button
				                    onClick={() => {
				                        this.props.getPosts(this.props.page);
				                        setTimeout(() => {
				                            this.props.backpag();
				                        }, 100);
				                    }}
				                >
									Finalizar
				                </button>
				            </div>
				        )}
				        <ul className="squares"></ul>
				    </div>
				)}
			</>
	    );
	}
}
