import React, { Component } from 'react';

// import { Container } from './styles';\

import { Pacman } from 'react-pure-loaders';

import swal from '@sweetalert/with-react';

import { MdDateRange, MdPerson } from 'react-icons/md';

import { FaQrcode } from 'react-icons/fa';

import api from '../../../services/api';

import './styles.css';

import '../../stylesRetangulo/styles.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import QRCode from 'qrcode.react';

export default class PostQrcode extends Component {
	state = {
	    onScreen: false,
	    enviar: false,
	    page: 1,
	    value: 'Digite o título da postagem'
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	        this.EffectCubo();
	    }, 100);

	    this.getPosts(this.state.page);
	};

	removeFromState = id => {
	    this.setState({
	        docs: this.state.docs.filter(post => post._id !== id)
	    });
	};

	downloadQR = id => {
	    const canvas = document.getElementById('qrcode-muhna-gen');
	    const pngUrl = canvas
	        .toDataURL('image/png')
	        .replace('image/png', 'image/octet-stream');
	    let downloadLink = document.createElement('a');
	    downloadLink.href = pngUrl;
	    downloadLink.download = `qrcode-muhna-${id}.png`;
	    document.body.appendChild(downloadLink);
	    downloadLink.click();
	    document.body.removeChild(downloadLink);
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

	noInternet = () => {
	    swal('Erro na busca', 'você possui conexão com a internet?', 'error');
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

	editPost = (title, resume, post, postid) => {
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
				    <div className="postChange-main-Post-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="postChange-main-Post">
				        <div className="postChange-sub-div-post">
				            <div id="inputOne">
				                <br />
				                <input
				                    value={this.state.value}
				                    type="text"
				                    onChange={this.changeInput}
				                    onBlur={() => {
				                        this.setState({
				                            value: 'Digite o título da postagem'
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
											{!this.state.searchActive ? (
												<>
													<div className="div-title-deletePost">
													    <h2>
															Ou veja todas as
															postagens
													    </h2>
													</div>
												</>
											) : null}

											<div className="div-li-excludePost">
											    <div className="new-postChange-sub-div-post-li">
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
											                post => (
											                    <li
											                        key={
											                            post._id
											                        }
											                    >
											                        <div className="div-vertical">
											                            <div>
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
											                                    {post.autor ||
																					''}
											                                </span>
											                            </div>
											                        </div>
											                        <div
											                            className="button-delete"
											                            onClick={() => {
											                                this.downloadQR(
											                                    post._id
											                                );
											                            }}
											                        >
											                            <QRCode
											                                id="qrcode-muhna-gen"
											                                value={`#id=${post._id}`}
											                                size={
											                                    500
											                                }
											                                level={
											                                    'H'
											                                }
											                                includeMargin={
											                                    true
											                                }
											                            />

											                            <FaQrcode
											                                size={
											                                    26
											                                }
											                                color="#000"
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
											<h2>Nenhuma postagem encontrada</h2>
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
