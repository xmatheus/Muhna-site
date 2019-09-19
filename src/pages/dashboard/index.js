import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import EditorText from '../editorText';

import BarLeft from './BarLeft';

import './styles.css';

class Dashboard extends Component {
	state = {
	    component: null
	};
	teste = async exibir => {
	    this.setState({ component: exibir });
	};
	render() {
	    return (
	        <div className="main-div">
	            <BarLeft component={this.teste}></BarLeft>
	            {this.state.component}
	        </div>
	    );
	}
}

export default withRouter(Dashboard);
