import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import BarLeft from './BarLeft';

import './styles.css';

import AboutPage from './AboutPage';

class Dashboard extends Component {
	state = {
	    component: <AboutPage></AboutPage>
	};
	setComponent = async exibir => {
	    this.setState({ component: exibir });
	};
	render() {
	    return (
	        <div className="main-div">
	            <BarLeft
	                component={this.setComponent}
	                history={this.props.history}
	            ></BarLeft>
	            {this.state.component}
	        </div>
	    );
	}
}

export default withRouter(Dashboard);
