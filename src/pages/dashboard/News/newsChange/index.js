import React, { Component } from 'react';

// import { Container } from './styles';\

import { Pacman } from 'react-pure-loaders';

import swal from '@sweetalert/with-react';

import { MdDateRange, MdPerson } from 'react-icons/md';

import api from '../../../services/api';

import './styles.css';

import '../../stylesRetangulo/styles.css';

import NewsCreateChanged from './newsCreateChanged';

import {
    Container,
    SubContainer,
    ContainerUploadFiles,
    BotaoVerde,
    Loading,
    PacmanLoad
} from '../../StyledComponentsDashboard/styles';

export default class NewsChange extends Component {
	state = {
	    onScreen: false,
	    enviar: false,
	    proxPag: false,
	    searchActive: false,
	    page: 1,
	    value: 'Digite o título das notícias'
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);

	    this.getNews(this.state.page);
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

	noInternet = () => {
	    swal({
	        title: 'Opa, problemas :|',
	        text: 'Sua internet caiu?',
	        icon: 'warning',
	        buttons: 'fechar',
	        dangerMode: true
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
				    <Loading>
				        <Pacman color={'#3f2306'} loading={true} />
				    </Loading>
				) : (
				    <Container className="newsChange-main-News">
				        {!this.state.proxPag ? (
				            <SubContainer className="newsChange-sub-div-news">
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
												<div className="div-title-changeNews">
												    {!this.state
												        .searchActive ? (
														<>
															<h2>
																Ou veja todas as
																notícias
															</h2>
														</>
												        ) : null}
												</div>
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
												                        {news.createAt
												                            ? this.ArrumaData(
												                                news.createAt
																			  )
												                            : 'null'}
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
												                        {news.autor ||
																			''}
												                    </span>
												                </div>
												            </li>
												        )
												    )}
												</div>
												{!this.state.searchActive ? (
												    <PacmanLoad>
												        <p>
												            {page +
																'/' +
																pages.pages}
												        </p>
												    </PacmanLoad>
												) : null}
												<div className="div-button-proxAndback">
												    <button
												        disabled={
												            page === 1 ||
															this.state
															    .searchActive
												        }
												        onClick={this.back}
												    >
														Voltar
												    </button>
												    <button
												        disabled={
												            page ===
																pages.pages ||
															this.state
															    .searchActive
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
				                    <PacmanLoad>
				                        <Pacman
				                            color={'#3f2306'}
				                            loading={true}
				                        />
				                    </PacmanLoad>
				                )}
				            </SubContainer>
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
				    </Container>
				)}
			</>
	    );
	}
}
