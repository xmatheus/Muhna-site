import React, { Component } from 'react';

import './styles.css';

import '../../stylesRetangulo/styles.css';

import QRCode from 'qrcode.react';

import { Pacman } from 'react-pure-loaders';

import EditorText from '../../../editorText';

import api from '../../../services/api';

import { login, saveData } from '../../../services/auth';

import swal from '@sweetalert/with-react';

import UploadFiles from '../uploadFiles';

export default class PostCreate extends Component {
	state = {
	    onScreen: false,
	    enviar: false,
	    proxPag: false
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

	postagemEnviada = () => {
	    swal('Sucesso', 'A postagem foi enviada!', 'success');
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
	        api.post('/post/create', {
	            title,
	            post
	        })
	            .then(response => {
	                const { _id, status } = response.data;
	                this.setState({ postid: _id });
	                if (status === 401) {
	                    this.deuErro();
	                }
	                console.log('-> postagem enviada');
	                this.setState({ enviar: false });
	                this.changeEffect();
	                this.postagemEnviada();
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

	downloadQR = () => {
	    const canvas = document.getElementById('qrcode-muhna');
	    const pngUrl = canvas
	        .toDataURL('image/png')
	        .replace('image/png', 'image/octet-stream');
	    let downloadLink = document.createElement('a');
	    downloadLink.href = pngUrl;
	    downloadLink.download = 'qrcode-muhna.png';
	    document.body.appendChild(downloadLink);
	    downloadLink.click();
	    document.body.removeChild(downloadLink);
	};

	render() {
	    return (
			<>
				{!this.state.onScreen ? (
				    <div className="main-post-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="main-post">
				        {!this.state.proxPag ? (
				            <div className="sub-div-post">
				                <form>
				                    <label>Titulo</label>
				                    <br></br>
				                    <input
				                        value={this.props.title}
				                        type="text"
				                        name="titulo"
				                        maxLength="60"
				                        onChange={this.handleChangeTitle}
				                    />
				                </form>
				                <div className="editor-text">
				                    <EditorText
				                        onChange={this.handleChangePosts}
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
				                    postid={this.state.postid}
				                ></UploadFiles>
				                <div id="qrcode-div">
				                    <QRCode
				                        id="qrcode-muhna"
				                        value={`#id=${this.state.postid}`}
				                        size={500}
				                        level={'H'}
				                        includeMargin={true}
				                    />
				                    <a onClick={this.downloadQR}>
										Download QRcode
				                    </a>
				                    <button onClick={this.backPag}>
										Finalizar
				                    </button>
				                </div>
				            </div>
				        )}
				        <ul className="squares"></ul>
				    </div>
				)}
			</>
	    );
	}
}
