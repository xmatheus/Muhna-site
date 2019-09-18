import React, { Component } from 'react';

// import { Container } from './styles';
import './styles.css';

import { getData } from '../../services/auth';

import logo from '../../../assets/logo.png';

export default class BarLeft extends Component {
	state = {
	    data: []
	};

	componentDidMount = () => {
	    const data = getData();
	    this.setState({ data: data });
	};

	render() {
	    return (
	        <div className="barleft-main-div">
	            {this.state.data ? (
	                <div>
	                    <img src={logo}></img>
	                    <p id="p-hello-visit">
	                        {'Olá, ' + this.state.data.name + '.'}
	                    </p>
	                    <div className="menu-items">
	                        <p>Notícias</p>
	                        <hr />
	                        <p>Visita guiada</p>
	                        <hr />
	                        {this.state.data.isAdmin ? (
								<>
									<p>Usuários</p>
									<hr />
								</>
	                        ) : null}
	                    </div>
	                </div>
	            ) : null}
	        </div>
	    );
	}
}
