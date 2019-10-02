import React, { Component } from 'react';

// import { Container } from './styles';\

import { Pacman } from 'react-pure-loaders';

import swal from '@sweetalert/with-react';

import { MdDateRange, MdPerson } from 'react-icons/md';

import api from '../../../services/api';

import { logout } from '../../../services/auth';

import './styles.css';

import NewsCreateChanged from './newsCreateChanged';

export default class NewsChange extends Component {
    constructor(props) {
        super(props);
    }

	state = {
	    onScreen: false,
	    enviar: false,
	    proxPag: false,
	    page: 1
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);

	    this.getNews(this.state.page);
	};

	getNews = async (page = 1) => {
	    const response = await api.get(`/news/show?page=${page}`);

	    const { docs, ...pages } = response.data;

	    this.setState({ docs, pages, page });
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
	    this.setState({ enviar: true });

	    setTimeout(() => {
	        const { title, resume, news } = this.state;
	        api.post('/news/create', {
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
	                console.log('-> noticia enviada');
	                this.setState({ enviar: false });
	                this.changeEffect();
	                this.noticiaEnviada();
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
				        {!this.state.proxPag ? (
				            <div className="newsChange-sub-div-news">
				                {this.state.docs ? (
									<>
										{this.state.docs.length ? (
											<>
												<>
													<h2>Todas as notícias</h2>
													<p>
													    {page +
															'/' +
															pages.pages}
													</p>
												</>
												<div className="newsChange-sub-div-news-li">
												    {this.state.docs.map(
												        news => (
												            <li
												                key={news._id}
												                onClick={() => {
												                    this.editNews(
												                        news.title,
												                        news.resume,
												                        news.news,
												                        news._id
												                    );
												                }}
												            >
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
												                        {this.ArrumaData(
												                            news.createAt
												                        )}
												                    </span>
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
												                        {
												                            news.autor
												                        }
												                    </span>
												                </div>
												            </li>
												        )
												    )}
												</div>
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
												<h2>
													Nenhuma notícia encontrada
												</h2>
											</>
										)}
									</>
				                ) : (
									<>
										<Pacman
										    color={'#3f2306'}
										    loading={true}
										/>
									</>
				                )}
				            </div>
				        ) : (
				            <NewsCreateChanged
				                title={this.state.title}
				                resume={this.state.resume}
				                news={this.state.news}
				                history={this.props.history}
				                newsid={this.state.newsid}
				                backpag={this.backPag}
				                getNews={this.getNews}
				                page={this.state.page}
				            />
				        )}
				        <ul className="squares"></ul>
				    </div>
				)}
			</>
	    );
	}
}
