import React, { Component } from 'react';

import { FaNewspaper, FaQrcode, FaUsers } from 'react-icons/fa';

import { MdKeyboardArrowLeft, MdExpandMore } from 'react-icons/md';

// import { Container } from './styles';
import './styles.css';

import { getData } from '../../services/auth';

import logo from '../../../assets/logo.png';

import News from '../News';

export default class BarLeft extends Component {
	state = {
	    data: [],
	    color: '#fafafa'
	};

	componentDidMount = () => {
	    const data = getData();
	    this.setState({ data: data, component: this.props.component || null });
	};

	render() {
	    return (
	        <div className="barleft-main-div">
	            {this.state.data ? (
	                <>
	                    <div className="barleft-one-div">
	                        <img alt="logo MuHNA" id="img-div" src={logo}></img>
	                        <p id="p-hello-visit">
	                            {'Olá, ' + this.state.data.name + '.'}
	                        </p>
	                    </div>
	                    <div className="menu-items">
	                        <div className="div-vertical">
	                            <div
	                                className="div-horizontal"
	                                onClick={() => {
	                                    this.setState({
	                                        newsOn: !this.state.newsOn
	                                    });
	                                }}
	                            >
	                                <FaNewspaper
	                                    color={this.state.color}
	                                    size={25}
	                                />
	                                <p>Notícias</p>

	                                {!this.state.newsOn ? (
	                                    <MdKeyboardArrowLeft
	                                        color={this.state.color}
	                                        size={19}
	                                    />
	                                ) : (
	                                    <MdExpandMore
	                                        color={this.state.color}
	                                        size={19}
	                                    />
	                                )}
	                            </div>
	                            {this.state.newsOn ? (
	                                <div className="div-news-menu">
	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<News history={this.props.history}/>);
	                                        }}
	                                    >
	                                        <FaNewspaper
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Criar notícia</p>
	                                    </div>

	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaNewspaper
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Alterar notícia</p>
	                                    </div>
	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaNewspaper
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Excluir notícia</p>
	                                    </div>
	                                </div>
	                            ) : null}
	                        </div>

	                        <div className="div-vertical">
	                            <div
	                                className="div-horizontal"
	                                onClick={() => {
	                                    this.setState({
	                                        visitOn: !this.state.visitOn
	                                    });
	                                }}
	                            >
	                                <FaQrcode
	                                    color={this.state.color}
	                                    size={25}
	                                />
	                                <p>Visita guiada</p>

	                                {!this.state.visitOn ? (
	                                    <MdKeyboardArrowLeft
	                                        color={this.state.color}
	                                        size={19}
	                                    />
	                                ) : (
	                                    <MdExpandMore
	                                        color={this.state.color}
	                                        size={19}
	                                    />
	                                )}
	                            </div>
	                            {this.state.visitOn ? (
	                                <div className="div-news-menu">
	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaQrcode
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Criar postagem</p>
	                                    </div>

	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaQrcode
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Alterar postagem</p>
	                                    </div>
	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaQrcode
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Excluir postagem</p>

	                                    </div>
										<div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaQrcode
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Gerar QrCode</p>
											
	                                    </div>
	                                </div>
	                            ) : null}
	                        </div>
	                        {this.state.data.isAdmin ? (
								<div className="div-vertical">
	                            <div
	                                className="div-horizontal"
	                                onClick={() => {
	                                    this.setState({
	                                        userOn: !this.state.userOn
	                                    });
	                                }}
	                            >
	                                <FaUsers
	                                    color={this.state.color}
	                                    size={25}
	                                />
	                                <p>Usuários</p>

	                                {!this.state.userOn ? (
	                                    <MdKeyboardArrowLeft
	                                        color={this.state.color}
	                                        size={19}
	                                    />
	                                ) : (
	                                    <MdExpandMore
	                                        color={this.state.color}
	                                        size={19}
	                                    />
	                                )}
	                            </div>
	                            {this.state.userOn ? (
	                                <div className="div-news-menu">
	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaUsers
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Criar usuário</p>
	                                    </div>

	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<h1>Em desenvolvimento</h1>);
	                                        }}
	                                    >
	                                        <FaUsers
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Excluir usuário</p>

	                                    </div>
										
	                                </div>
	                            ) : null}
	                        </div>
	                        ) : null}
	                    </div>
	                </>
	            ) : null}
	        </div>
	    );
	}
}
