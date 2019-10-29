import React, { Component } from 'react';

import { Container, Button, ContainerYTLink, Formularios } from './styles';

import Modal from 'react-modal';

import swal from '@sweetalert/with-react';

import api from '../../../services/api';

import LinkList from './LinkList';

import './styles.css';

export default class LinkYtUpload extends Component {
	state = {
	    showModal: false,
	    urls: [],
	    url: ''
	};

	componentDidMount = () => {
	    this.searchLinksFromNews();
	};

	searchLinksFromNews = async () => {
	    try {
	        const response = await api.get(
	            `/fileNews/news?newsid=${this.props.newsid}`
	        );

	        const { link } = response.data;

	        if (link) {
	            const urls = link.map(url => {
	                const id = url.link.split(
	                    'https://www.youtube.com/watch?v='
	                )[1];
	                const preview = `https://img.youtube.com/vi/${id}/default.jpg`;
	                console.log(preview);
	                return { id: url._id, link: url.link, preview };
	            });

	            this.setState({ urls });

	            console.log(urls);
	        }
	    } catch (error) {
	        console.log(error);
	    }
	};

	handleOpenModal = () => {
	    this.setState({ showModal: true });
	};

	handleCloseModal = () => {
	    this.setState({ showModal: false });
	};

	handleChangeUrl = event => {
	    this.setState({ url: event.target.value });
	};

	addEfeitoUp = () => {
	    const formLogin = document.querySelector('.Modal-Div');
	    formLogin.classList.add('effectUp');
	    // document.querySelector('.login').style.border = '1px solid red';
	    const formError = document.querySelector('.effectUp');
	    if (formError) {
	        formError.addEventListener('animationend', event => {
	            if (event.animationName === 'upModal') {
	                this.handleCloseModal();
	                formError.classList.remove('effectUp');
	            }
	        });
	    }
	};

	onDelete = async id => {
	    try {
	        await api.delete(`/fileNews/?id=${id}`);
	        this.setState({
	            urls: this.state.urls.filter(link => link.id !== id)
	        });
	    } catch (error) {
	        swal(
	            'Deu erro na hora de excluir',
	            'Tente logar novamente',
	            'error'
	        );
	        console.log(error);
	    }
	};

	sendLink = async () => {
	    const url = this.state.url;
	    if (url.includes('watch?v=')) {
	        const id = url.split('https://www.youtube.com/watch?v=')[1];

	        const a = this.state.urls;

	        const link = this.state.url;

	        const newsid = this.props.newsid;

	        if (this.props.newsid) {
	            try {
	                const response = await api.post(
	                    `/fileNews/link?newsid=${newsid}`,
	                    {
	                        link
	                    }
	                );

	                const { _id } = response.data;

	                const preview = `https://img.youtube.com/vi/${id}/default.jpg`;

	                console.log(preview);
	                a.push({ id: _id, link, preview });

	                this.setState({ urls: a });
	                console.log(this.state.urls);
	            } catch (error) {
	                swal('Deu erro no envio', 'Tente logar novamente', 'error');
	            }
	        } else {
	            swal('Erro', 'falta o id da notícia', 'error');
	        }
	    } else {
	        swal('Erro', 'LINK inválido', 'error');
	    }
	};

	render() {
	    return (
	        <Container>
	            <Button onClick={this.handleOpenModal} red={true}>
					Enviar link do YT
	            </Button>
	            <Modal isOpen={this.state.showModal} className="Modal-Div">
	                <ContainerYTLink>
	                    <Formularios>
	                        <input
	                            type="text"
	                            value={this.state.url}
	                            onChange={this.handleChangeUrl}
	                            placeholder="https://www.youtube.com/watch?v=h1XxjPeducs"
	                            pattern="https://*"
	                            size="30"
	                            required
	                        />
	                        <button
	                            onClick={() => {
	                                this.sendLink();
	                            }}
	                        >
								Enviar
	                        </button>
	                    </Formularios>
	                    <LinkList
	                        urls={this.state.urls}
	                        onDelete={this.onDelete}
	                    />
	                    <Button
	                        onClick={() => {
	                            this.addEfeitoUp();
	                        }}
	                    >
							Fechar
	                    </Button>
	                </ContainerYTLink>
	            </Modal>
	        </Container>
	    );
	}
}
