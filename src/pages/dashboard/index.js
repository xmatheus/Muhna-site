import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import EditorText from '../editorText';

import BarLeft from './BarLeft';

import './styles.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="main-div">
                <BarLeft></BarLeft>
            </div>
        );
    }
}

export default withRouter(Dashboard);
