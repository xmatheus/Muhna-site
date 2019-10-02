import React, { Component } from 'react';

// import { Container } from './styles';\
import './styles.css';

import { Pacman } from 'react-pure-loaders';

import EditorText from '../../../../editorText';

import api from '../../../../services/api';

import { logout } from '../../../../services/auth';

import swal from '@sweetalert/with-react';

import UploadFiles from '../../uploadFiles';

export default class NewsCreateChanged extends Component {
	state = {
	    onScreen: false,
	    enviar: false,
	    proxPag: false,
	    title: this.props.title,
	    resume: this.props.resume
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

	handleChangeResume = event => {
	    this.setState({ resume: event.target.value });
	};

	handleChangeNews = news => {
	    this.setState({ news });
	};

	sessaoExpirada = () => {
	    logout();
	    swal({
	        content: (
	            <div>
	                <h1>Opa, sua sessão expirou.</h1>
	                <br />
	                <br />
	                <p>faça login novamente!</p>
	            </div>
	        ),
	        buttons: {
	            catch: {
	                text: 'certo',
	                value: 1
	            }
	        }
	    }).then(value => {
	        this.props.history.push('/');
	    });
	};

	deuErro = () => {
	    logout();
	    swal({
	        content: (
	            <div>
	                <h1>:( deu erro</h1>
	                <br />
	                <br />
	                <p>tente fazer login novamente</p>
	            </div>
	        ),
	        buttons: {
	            catch: {
	                text: 'certo',
	                value: 1
	            }
	        }
	    }).then(value => {
	        this.props.history.push('/');
	    });
	};

	noticiaAlterada = () => {
	    swal({
	        content: (
	            <div>
	                <h1>:) deu certo</h1>
	                <br />
	                <br />
	                <p>a notícia foi alterada</p>
	            </div>
	        ),
	        buttons: {
	            catch: {
	                text: 'certo'
	            }
	        }
	    });
	};

	enviar = () => {
	    this.setState({ enviar: true });

	    setTimeout(() => {
	        const { title, resume, news } = this.state;
	        api.put(`news/update?newsid=${this.props.newsid}`, {
	            title,
	            resume,
	            news
	        })
	            .then(response => {
	                const { _id, status } = response.data;
	                this.setState({ newsid: _id });
	                if (status === 401) {
	                    this.sessaoExpirada();
	                }
	                console.log('-> noticia alterada');
	                this.setState({ enviar: false });
	                this.changeEffect();
	                this.noticiaAlterada();
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
	    const formOne = document.querySelector('.sub-div-news');
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
				    <div className="main-News-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="main-News">
				        {!this.state.proxPag ? (
				            <div className="sub-div-news">
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

				                    <label>Resumo</label>
				                    <br></br>
				                    <input
				                        value={this.state.resume}
				                        type="text"
				                        name="resumo"
				                        maxLength="226"
				                        onChange={this.handleChangeResume}
				                    />
				                </form>
				                <div className="editor-text">
				                    <EditorText
				                        onChange={this.handleChangeNews}
				                        html={this.props.news}
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
				                    newsid={this.props.newsid}
				                ></UploadFiles>
				                <button
				                    onClick={() => {
				                        this.props.getNews(this.props.page);
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
