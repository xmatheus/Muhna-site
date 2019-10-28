import React, { Component } from "react";

// import { Container } from './styles';

import GalleryComponent from "./galleryComponent";

import "./styles.css";

export default class Gallery extends Component {
	render() {
		return (
			<div className="gallery-main-div">
				<h1 style={{ color: "#fff" }}>Galeria</h1>
				<GalleryComponent />
				<button
					id="gallery-main-button-close"
					onClick={this.props.closeModal}
				>
					Fechar Modal
				</button>
			</div>
		);
	}
}
