import React, { Component } from 'react';

// import { Container } from './styles';\

import { Pacman } from 'react-pure-loaders';

import swal from '@sweetalert/with-react';

import { MdDateRange, MdPerson, MdDelete } from 'react-icons/md';

import api from '../../../services/api';

import { logout } from '../../../services/auth';

import './styles.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class NewsDelete extends Component {
    constructor(props) {
        super(props);
    }

	state = {
	    onScreen: false,
	    enviar: false,
	    page: 1
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);

	    this.getNews(this.state.page);
	};

	removeFromState = id => {
	    this.setState({
	        docs: this.state.docs.filter(news => news._id !== id)
	    });
	};
	deleteNews = async id => {
	    const { docs, page } = this.state;

	    if (docs.length === 1) {
	        this.getNews(page);
	    }
	    try {
	        await api.post(`/news/remove?newsid=${id}`);

	        this.removeFromState(id);
	    } catch (error) {
	        this.deuErro();
	    }
	};

	getNews = async (page = 1) => {
	    try {
	        const response = await api.get(`/news/show?page=${page}&limite=5`);

	        const { docs, ...pages } = response.data;

	        this.setState({ docs, pages, page });
	    } catch (error) {
	        this.noInternet();
	    }
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
	                text: 'ok',
	                value: 1
	            }
	        }
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
	        this.getNews(page);
	    }
	};

	prox = () => {
	    let { pages, page } = this.state;

	    if (page === pages.pages) {
	        return;
	    } else {
	        page += 1;
	        this.setState({ docs: null });
	        this.getNews(page);
	    }
	};

	editNews = (title, resume, news, newsid) => {
	    this.setState({ title, resume, news, newsid });
	    this.setState({ proxPag: true });
	};

	backPag = () => {
	    this.setState({ proxPag: false });
	};

	changeInput = async e => {
	    const value = e.target.value;
	    this.setState({ value });

	    if (value.length > 0) {
	        this.setState({ searchActive: true });
	        const response = await api.post(`/news/search?title=${value}`);

	        const { docs } = response.data;

	        this.setState({ docs });
	    } else {
	        this.setState({ searchActive: false });
	        this.getNews(this.state.page);
	    }
	};

	render() {
	    const { pages, page } = this.state;
	    return (
			<>
				{!this.state.onScreen ? (
				    <div className="newsChange-main-News-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="newsChange-main-News">
				        <div className="newsChange-sub-div-news">
				            <div id="inputOne">
				                <br />
				                <input
				                    value={this.state.value}
				                    type="text"
				                    onChange={this.changeInput}
				                    onBlur={() => {
				                        this.setState({
				                            value:
												'Digite o título das notícias'
				                        });

				                        setTimeout(() => {
				                            this.getNews(this.state.page);
				                            this.setState({
				                                searchActive: false
				                            });
				                        }, 100);
				                    }}
				                    onFocus={() => {
				                        this.setState({
				                            value: ''
				                        });
				                    }}
				                />
				                <br />
				                <br />
				            </div>
				            {this.state.docs ? (
								<>
									{this.state.docs.length ? (
										<>
											{!this.state.searchActive ? (<>
												<div className="div-title-deleteNews">
											    <h2>Ou veja todas as notícias</h2>
											</div></>):(null)}

											<div className="div-li-excludeNews">
											    <div className="new-newsChange-sub-div-news-li">
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
											                news => (
											                    <li
											                        key={
											                            news._id
											                        }
											                    >
											                        <div className="div-vertical">
											                            <div>
											                                <h4>
											                                    {news.title ||
																					'"sem titulo"'}
											                                </h4>
											                                <div className="icons-horizontal">
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
											                                        {news.createAt
											                                            ? this.ArrumaData(
											                                                news.createAt
																						  )
											                                            : null}
											                                    </span>
											                                </div>
											                            </div>
											                            <div className="icons-horizontal">
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
											                                    {news.autor ||
																					''}
											                                </span>
											                            </div>
											                        </div>
											                        <div
											                            className="button-delete"
											                            onClick={() => {
											                                this.deleteNews(
											                                    news._id
											                                );
											                            }}
											                        >
											                            <MdDelete
											                                size={
											                                    21
											                                }
											                                color="#b60202"
											                            />
											                        </div>
											                    </li>
											                )
											            )}
											        </ReactCSSTransitionGroup>
											    </div>
											</div>
											{!this.state.searchActive ? (
												    <div>
												        <p>
												            {page +
																'/' +
																pages.pages}
												        </p>
												    </div>
												) : null}
											<div className="div-button-proxAndback">
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
											</div>
										</>
									) : (
										<>
											<h2>Nenhuma notícia encontrada</h2>
										</>
									)}
								</>
				            ) : (
								<>
									<Pacman color={'#3f2306'} loading={true} />
								</>
				            )}
				        </div>
				        <ul className="squares"></ul>
				    </div>
				)}
			</>
	    );
	}
}
