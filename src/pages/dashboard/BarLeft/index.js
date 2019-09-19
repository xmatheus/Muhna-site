import React, { Component } from 'react';

import { FaNewspaper, FaQrcode, FaUsers } from 'react-icons/fa';

// import { Container } from './styles';
import './styles.css';

import { getData } from '../../services/auth';

import logo from '../../../assets/logo.png';

import EditorText from '../../editorText/index';

export default class BarLeft extends Component {
	state = {
	    data: []
	};

	componentDidMount = () => {
	    const data = getData();
	    this.setState({ data: data, component: this.props.component || null });
	};

	render() {
	    return (
	        <div className="barleft-main-div">
	            {this.state.data ? (
	                <div>
	                    <div className="barleft-one-div">
	                        <img id="img-div" src={logo}></img>
	                        <p id="p-hello-visit">
	                            {'Olá, ' + this.state.data.name + '.'}
	                        </p>
	                    </div>
	                    <div className="menu-items">
	                        <div className="div-horizontal">
	                            <FaNewspaper color="#ffffff" size={25} />
	                            <p
	                                onClick={() => {
	                                    this.props.component(<h1>Noticias</h1>);
	                                }}
	                            >
									Notícias
	                            </p>
	                        </div>

	                        <div className="div-horizontal">
	                            <FaQrcode color="#ffffff" size={25} />
	                            <p
	                                onClick={() => {
	                                    this.props.component(
	                                        <EditorText></EditorText>
	                                    );
	                                }}
	                            >
									Visita guiada
	                            </p>
	                        </div>
	                        {this.state.data.isAdmin ? (
								<>
									<div className="div-horizontal">
									    <FaUsers color="#ffffff" size={25} />
									    <p
									        onClick={() => {
									            this.props.component(
									                <h1>Usuarios</h1>
									            );
									        }}
									    >
											Usuários
									    </p>
									</div>
								</>
	                        ) : null}
	                    </div>
	                </div>
	            ) : null}
	        </div>
	    );
	}
}
