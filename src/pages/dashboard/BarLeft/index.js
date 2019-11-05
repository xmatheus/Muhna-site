import React, { Component } from 'react';

import { FaNewspaper, FaQrcode, FaUsers } from 'react-icons/fa';

import { MdKeyboardArrowLeft, MdExpandMore } from 'react-icons/md';

// import { Container } from './styles';

import { getData, logout } from '../../services/auth';

import logo from '../../../assets/logo.png';

import AboutPage from '../AboutPage'

import NewsCreate from '../News/newsCreate';

import NewsChange from '../News/newsChange'

import NewsDelete from '../News/newsDelete'

import PostCreate from '../Post/postCreate';

import PostDelete from '../Post/postDelete'

import PostsChange from '../Post/postChange'

import PostQrcode from '../Post/postQrcode'

import UserCreate from '../User/userCreate'

import UserDelete from '../User/userDelete'

import './styles.css';


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
	                    <div className="barleft-one-div" onClick={()=>{this.props.component(<AboutPage/>)}}  >
	                        <img></img>
	                        <p id="p-hello-visit">
	                            {'Olá, ' + this.state.data.name + '.'}
	                        </p>
	                        <button onClick={()=>{logout(); this.props.history.push('/')}}>sair</button>
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
	                                            this.props.component(<NewsCreate history={this.props.history}/>);
	                                        }}
	                                    >
	                                        <FaNewspaper
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Criar notícia</p>
	                                    </div>

	                                    <div
	                                        className="div-horizontal-subMenu" onClick={() => { this.props.component(<NewsChange history={this.props.history}/>);}}>
	                                        <FaNewspaper
	                                            color={this.state.color}
	                                            size={16}
	                                        />
	                                        <p>Alterar notícia</p>
	                                    </div>
	                                    <div
	                                        className="div-horizontal-subMenu"
	                                        onClick={() => {
	                                            this.props.component(<NewsDelete history={this.props.history}/>);
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

	                                            this.props.component(<PostCreate/>);
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
	                                            this.props.component(<PostsChange/>);
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
	                                            this.props.component(<PostDelete/>);
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
	                                            this.props.component(<PostQrcode/>);
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
	                                            this.props.component(<UserCreate/>);
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
	                                            this.props.component(<UserDelete/>);
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
