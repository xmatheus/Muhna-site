import React, { Component } from 'react';

import Modal from 'react-modal';

import UploadFilesGallery from './Gallery/uploadFiles';

import Gallery from './Gallery';

import './styles.css';

export default class AllGallery extends Component {
	state = {
	    showModal: false,
	    showModalUpload: false
	};

	handleOpenModal = () => {
	    this.setState({ showModal: true });
	};

	handleCloseModal = () => {
	    this.setState({ showModal: false });
	};

	handleOpenModalUpload = () => {
	    this.setState({ showModalUpload: true });
	};

	handleCloseModalUpload = () => {
	    this.setState({ showModalUpload: false });
	};

	addEfeitoUpModal = () => {
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

	addEfeitoUpModalUpload = () => {
	    const formLogin = document.querySelector('.Modal-Div');
	    formLogin.classList.add('effectUp');
	    // document.querySelector('.login').style.border = '1px solid red';
	    const formError = document.querySelector('.effectUp');
	    if (formError) {
	        formError.addEventListener('animationend', event => {
	            if (event.animationName === 'upModal') {
	                this.handleCloseModalUpload();
	                formError.classList.remove('effectUp');
	            }
	        });
	    }
	};

	render() {
	    return (
	        <div className="button-div-modal">
	            {/* parte da galeira => toda a galeira e o upload */}
	            <button onClick={this.handleOpenModal}>Galeria</button>
	            <Modal isOpen={this.state.showModal} className="Modal-Div">
	                <Gallery closeModal={this.addEfeitoUpModal} />
	            </Modal>

	            <button onClick={this.handleOpenModalUpload}>
					Upload galeria
	            </button>

	            <Modal
	                isOpen={this.state.showModalUpload}
	                className="Modal-Div"
	            >
	                <UploadFilesGallery
	                    closeModal={this.addEfeitoUpModalUpload}
	                />
	            </Modal>
	        </div>
	    );
	}
}
