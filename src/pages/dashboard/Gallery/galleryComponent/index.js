import React, { Component } from 'react';

// import { Container } from './styles';

import Gallery from 'react-grid-gallery';

const imagens = [
    {
        src: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
        thumbnail:
			'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg',

        caption: '8H (gratisography.com)'
    },
    {
        src: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
        thumbnail:
			'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg',

        caption: '286H (gratisography.com)'
    },
    {
        src: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
        thumbnail:
			'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg',

        caption: '315H (gratisography.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
        thumbnail:
			'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg',

        caption: '201H (gratisography.com)'
    },
    {
        src: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
        thumbnail:
			'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg',

        caption: 'Big Ben (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg',
        thumbnail:
			'https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg',

        caption: 'Red Zone - Paris (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
        thumbnail:
			'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg',

        caption: 'Wood Glass (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
        thumbnail:
			'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg',

        caption: 'Flower Interior Macro (Tom Eversley - isorepublic.com)'
    }
];

export default class GalleryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: imagens,
            currentImage: 0
        };

        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    deleteImage() {
        if (
            window.confirm(
                `Are you sure you want to delete image number ${this.state.currentImage}?`
            )
        ) {
            var images = this.state.images.slice();
            images.splice(this.state.currentImage, 1);
            this.setState({
                images: images
            });
        }
    }

    render() {
        return (
            <div
                style={{
                    display: 'block',
                    minHeight: '1px',
                    width: '100%',
                    overflow: 'auto',
                    marginLeft: '10px',
                    marginRight: '10px'
                }}
            >
                <div
                    style={{
                        padding: '2px',
                        color: '#666'
                    }}
                ></div>
                <Gallery
                    images={this.state.images}
                    enableLightbox={true}
                    enableImageSelection={false}
                    currentImageWillChange={this.onCurrentImageChange}
                    customControls={[
                        <button key="deleteImage" onClick={this.deleteImage}>
							Delete Image
                        </button>
                    ]}
                />
            </div>
        );
    }
}
