import React, { Component } from 'react';

// import { Container } from './styles';\
import './styles.css';

import { Pacman } from 'react-pure-loaders';

import EditorText from '../../editorText/index';

export default class News extends Component {
	state = {
	    onScreen: false
	};

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({ onScreen: true });
	    }, 100);
	};

	render() {
	    return (
			<>
				{!this.state.onScreen ? (
				    <div className="main-News-loading">
				        <Pacman color={'#3f2306'} loading={true} />
				    </div>
				) : (
				    <div className="main-News">
				        <EditorText></EditorText>
				    </div>
				)}
			</>
	    );
	}
}
