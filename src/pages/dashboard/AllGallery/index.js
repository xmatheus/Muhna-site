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

	render() {
	    return (
	        <div className="button-div-modal">
	            {/* parte da galeira => toda a galeira e o upload */}
	            <button onClick={this.handleOpenModal}>Galeria</button>
	            <Modal isOpen={this.state.showModal} className="Modal-Div">
	                <Gallery closeModal={this.handleCloseModal} />
	            </Modal>

	            <button onClick={this.handleOpenModalUpload}>
					Upload galeria
	            </button>

	            <Modal
	                isOpen={this.state.showModalUpload}
	                className="Modal-Div"
	            >
	                <UploadFilesGallery
	                    closeModal={this.handleCloseModalUpload}
	                />
	            </Modal>
	        </div>
	    );
	}
}
