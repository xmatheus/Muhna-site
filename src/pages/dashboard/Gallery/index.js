import React, { Component } from 'react';

// import { Container } from './styles';

import GalleryComponent from './galleryComponent';

import './styles.css';

export default class Gallery extends Component {
    render() {
        return (
            <div className="gallery-main-div">
                <GalleryComponent />
                <button
                    id="gallery-main-button-close"
                    onClick={this.props.closeModal}
                >
					Fechar galeria
                </button>
            </div>
        );
    }
}
