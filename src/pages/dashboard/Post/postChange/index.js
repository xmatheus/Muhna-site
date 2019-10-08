import React, { Component } from 'react';

// import { Container } from './styles';\

import { Pacman } from 'react-pure-loaders';

import swal from '@sweetalert/with-react';

import { MdDateRange, MdPerson } from 'react-icons/md';

import api from '../../../services/api';

import { logout } from '../../../services/auth';

import './styles.css';

import '../../stylesRetangulo/styles.css';

import PostsCreateChanged from './postCreateChanged';

export default class PostsChange extends Component {
	state = {
	    onScreen: false,
	    enviar: false,
	    proxPag: false,
	    searchActive: false,
	    page: 1,
	    value: 'Digite o título das postagens'
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);

	    this.getPosts(this.state.page);
	};

	getPosts = async (page = 1) => {
	    try {
	        const response = await api.get(`/post/show?page=${page}&limite=5`);

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
	        title: 'Opa, problemas :|',
	        text: 'Sua internet caiu?',
	        icon: 'warning',
	        buttons: 'fechar',
	        dangerMode: true
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
	        this.getPosts(page);
	    }
	};

	prox = () => {
	    let { pages, page } = this.state;

	    if (page === pages.pages) {
	        return;
	    } else {
	        page += 1;
	        this.setState({ docs: null });
	        this.getPosts(page);
	    }
	};

	editPosts = (title, resume, post, postid) => {
	    this.setState({ title, resume, post, postid });
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
	        const response = await api.post(`/post/search?title=${value}`);

	        const { docs } = response.data;

	        this.setState({ docs });
	    } else {
	        this.setState({ searchActive: false });
	        this.getPosts(this.state.page);
	    }
	};

	render() {
	    const { pages, page } = this.state;
	    return (
			<>
				{!this.state.onScreen ? (
				    <div className="postChange-main-Posts-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="postChange-main-Posts">
				        {!this.state.proxPag ? (
				            <div className="postChange-sub-div-post">
				                <div id="inputOne">
				                    <br />
				                    <input
				                        value={this.state.value}
				                        type="text"
				                        onChange={this.changeInput}
				                        onBlur={() => {
				                            this.setState({
				                                value:
													'Digite o título das postagens'
				                            });

				                            setTimeout(() => {
				                                this.getPosts(this.state.page);
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
												<div className="div-title-changePosts">
												    {!this.state
												        .searchActive ? (
														<>
															<h2>
																Ou veja todas as
																postagens
															</h2>
														</>
												        ) : null}
												</div>
												<div className="postChange-sub-div-post-li">
												    {this.state.docs.map(
												        post => (
												            <li
												                key={post._id}
												                onClick={() => {
												                    this.editPosts(
												                        post.title,
												                        post.resume,
												                        post.post,
												                        post._id
												                    );
												                }}
												            >
												                <h4>
												                    {post.title ||
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
												                        {post.createAt
												                            ? this.ArrumaData(
												                                post.createAt
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
												                        {post.autor ||
																			''}
												                    </span>
												                </div>
												            </li>
												        )
												    )}
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
									<>
										<Pacman
										    color={'#3f2306'}
										    loading={true}
										/>
									</>
				                )}
				            </div>
				        ) : (
				            <PostsCreateChanged
				                title={this.state.title}
				                resume={this.state.resume}
				                post={this.state.post}
				                history={this.props.history}
				                postid={this.state.postid}
				                backpag={this.backPag}
				                getPosts={this.getPosts}
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
