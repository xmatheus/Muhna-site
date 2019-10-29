import React, { Component } from 'react';

// import { Container } from './styles';

import Gallery from 'react-grid-gallery';

import swal from '@sweetalert/with-react';

import Lottie from 'react-lottie';

import { MdDelete } from 'react-icons/md';

import { IoMdClipboard } from 'react-icons/io';

import api from '../../../../services/api';

import './styles.css';

export default class GalleryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: null,
            currentImage: 0,
            loading: true,
            viewbutton: false
        };

        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

	componentDidMount = () => {
	    setTimeout(() => {
	        this.loadImagens();
	    }, 600);
	};

	onCurrentImageChange(index) {
	    this.setState({ currentImage: index });
	}

	PopupDeelete = id => {
	    swal({
	        title: 'Exluir Imagem?',
	        icon: 'warning',
	        buttons: ['cancelar', 'excluir'],
	        dangerMode: true
	    }).then(willDelete => {
	        if (willDelete) {
	            this.deleteImage();
	        }
	    });
	};

	deleteImage = async () => {
	    try {
	        const images = this.state.images.slice();
	        const { fileid } = images[this.state.currentImage];
	        await api.delete(`/galery?idfile=${fileid}`);
	        images.splice(this.state.currentImage, 1);
	        this.setState({
	            images: images
	        });
	        swal('Sucesso', 'A imagem foi excluida!', 'success');
	    } catch (error) {
	        swal('Erro', 'A imagem não excluida!', 'error');
	    }
	};

	loadImagens = async (page = 1) => {
	    this.setState({ loading: true });
	    this.setState({ viewbutton: false });
	    try {
	        const response = await api.get(`/galery?page=${page}&limite=${20}`);

	        const { docs, ...pages } = response.data;

	        // para os botoes de back e prox aparecerem depois que as imagens carregarem
	        setTimeout(() => {
	            this.setState({ viewbutton: true });
	        }, 1300);

	        if (docs) {
	            const images = docs.map(img => {
	                return {
	                    src: `${api.defaults.baseURL}/galery/image?filename=${img.filename}`,
	                    thumbnail: `${api.defaults.baseURL}/galery/image?filename=${img.filename}`,
	                    caption: img.originalname.split('.')[0],
	                    fileid: img.fileid,
	                    filename: img.filename
	                };
	            });
	            console.log(images);
	            this.setState({ images, pages, page });
	        }
	        setTimeout(() => {
	            this.setState({ loading: false });
	        }, 1000);
	    } catch (error) {
	        this.setState({ loading: false });
	        this.noInternet();
	        console.log(error.status);
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

	copyToClipboard = () => {
	    const images = this.state.images.slice();
	    const { filename } = images[this.state.currentImage];
	    navigator.clipboard.writeText(
	        `${api.defaults.baseURL}/galery/image?filename=${filename}`
	    );
	    swal(
	        'Copiado',
	        'O link está na sua área de transferência(ctrl+v)',
	        'success'
	    );
	    setTimeout(() => {
	        swal.close();
	    }, 4000);
	};

	back = () => {
	    let { page } = this.state;

	    if (page === 1) {
	        return;
	    } else {
	        page -= 1;
	        this.setState({ docs: null });
	        this.loadImagens(page);
	    }
	};

	prox = () => {
	    let { pages, page } = this.state;

	    if (page === pages.pages) {
	        return;
	    } else {
	        page += 1;
	        this.setState({ docs: null });
	        this.loadImagens(page);
	    }
	};

	render() {
	    const defaultOptions = {
	        loop: true,
	        autoplay: true,
	        animationData: require('./../../../../../assets/andando.json'),
	        rendererSettings: {
	            preserveAspectRatio: 'xMidYMid slice'
	        },
	        resizeMode: true
	    };

	    const defaultOptionsBoxEmpty = {
	        loop: true,
	        autoplay: true,
	        animationData: require('./../../../../../assets/caixavazia.json'),
	        rendererSettings: {
	            preserveAspectRatio: 'xMidYMid slice'
	        },
	        resizeMode: true
	    };

	    const { page, pages } = this.state;
	    return (
	        <div className="gallery-main-div">
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
	                {this.state.loading ? (
	                    <div style={{ marginTop: '60px' }}>
	                        <h1 style={{ color: '#fff', textAlign: 'center' }}>
								Buscando imagens
	                        </h1>

	                        <Lottie
	                            options={defaultOptions}
	                            height={'100%'}
	                            width={400}
	                            isStopped={false}
	                            isPaused={false}
	                        />
	                    </div>
	                ) : (
						<>
							{this.state.images !== null &&
							this.state.images.length > 0 ? (
								<>
									<Gallery
									    images={this.state.images}
									    enableLightbox={true}
									    enableImageSelection={false}
									    currentImageWillChange={
									        this.onCurrentImageChange
									    }
									    customControls={[
									        <div id="deleteImage">
									            <MdDelete
									                size={30}
									                color="#b60202"
									                onClick={() => {
									                    this.PopupDeelete();
									                }}
									            />
									        </div>,
									        <div
									            id="copyImage"
									            onClick={() => {
									                this.copyToClipboard();
									            }}
									        >
									            <IoMdClipboard
									                size={30}
									                color="#fafafa"
									            />
									        </div>
									    ]}
									    imageCountSeparator=" de "
									/>
								</>
							    ) : (
							        <div className="Empty-gallery">
							            <h3
							                style={{
							                    textAlign: 'center',
							                    color: '#fafafa',
							                    fontSize: '30px'
							                }}
							            >
										Galeria vazia :|
							            </h3>

							            <Lottie
							                options={defaultOptionsBoxEmpty}
							                height={'70%'}
							                width={400}
							                isStopped={false}
							                isPaused={false}
							            />
							        </div>
							    )}
						</>
	                )}
	            </div>

	            {this.state.viewbutton && (
	                <div className="gallery-button-proxAndback">
	                    <button
	                        id="gallery-prox-back"
	                        disabled={page === 1 || this.state.searchActive}
	                        onClick={this.back}
	                    >
							Voltar
	                    </button>
	                    <button
	                        id="gallery-prox-back"
	                        disabled={
	                            page === pages.pages || this.state.searchActive
	                        }
	                        onClick={this.prox}
	                    >
							Próximo
	                    </button>
	                </div>
	            )}
	        </div>
	    );
	}
}
