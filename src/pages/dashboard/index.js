import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import BarLeft from './BarLeft';

import './styles.css';

class Dashboard extends Component {
	state = {
	    component: null
	};
	setComponent = async exibir => {
	    this.setState({ component: exibir });
	};
	render() {
	    return (
	        <div className="main-div">
	            <BarLeft component={this.setComponent}></BarLeft>
	            {this.state.component}
	        </div>
	    );
	}
}

export default withRouter(Dashboard);
