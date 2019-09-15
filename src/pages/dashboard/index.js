import React, { Component } from 'react';

import './styles.css';

import { Link, withRouter } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        console.log('Dashboard');
        return (
            <div className="img-div">
                <h1>Aqui e onde ficara toda a pagina de controle</h1>
                <Link to="/">Pag de login</Link>
            </div>
        );
    }
}

export default withRouter(Dashboard);
