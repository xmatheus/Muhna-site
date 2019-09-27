import React, { Component } from 'react';

// import { Container } from './styles';\
import './styles.css';

import { Pacman } from 'react-pure-loaders';

import EditorText from '../../editorText/index';

import api from '../../services/api';

import { logout } from '../../services/auth';

import swal from '@sweetalert/with-react';

export default class News extends Component {
	state = {
	    onScreen: false,
	    enviar: 0
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

	noticiaEnviada = () => {
	    swal({
	        content: (
	            <div>
	                <h1>:) deu certo</h1>
	                <br />
	                <br />
	                <p>a notícia foi enviada</p>
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
	    this.setState({ enviar: 1 });

	    const { title, resume, news } = this.state;
	    api.post('/news/create', {
	        title,
	        resume,
	        news
	    })
	        .then(response => {
	            const { _id, status } = response.data;

	            if (status === 401) {
	                this.sessaoExpirada();
	            }
	            console.log('-> noticia enviada');
	            this.setState({ enviar: 0 });
	            this.noticiaEnviada();
	        })
	        .catch(error => {
	            this.setState({ enviar: 0 });
	            this.deuErro();
	        });
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
				        <div className="sub-div-news">
				            <form>
				                <label>Titulo</label>
				                <br></br>
				                <input
				                    type="text"
				                    name="titulo"
				                    onChange={this.handleChangeTitle}
				                />

				                <label>Resumo</label>
				                <br></br>
				                <input
				                    type="text"
				                    name="resumo"
				                    maxLength="226"
				                    onChange={this.handleChangeResume}
				                />
				            </form>
				            <div className="editor-text">
				                <EditorText
				                    onChange={this.handleChangeNews}
				                ></EditorText>
				            </div>
				            <div className="button-div">
				                <div id="pacmanLoad">
				                    {this.state.enviar ? (
				                        <Pacman color={'#000'} loading={true} />
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
				        <ul className="squares"></ul>
				    </div>
				)}
			</>
	    );
	}
}
