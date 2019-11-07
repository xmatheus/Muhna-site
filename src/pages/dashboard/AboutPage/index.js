import React, { Component } from 'react';

// import { Container } from './styles';
import './styles.css';

import '../stylesRetangulo/styles.css';

import { FaUserAstronaut, FaGithub, FaEnvelope } from 'react-icons/fa';

import { ContainerAbout, ContainerVertical } from './styles';

export default class AboutPage extends Component {
	componentDidMount = () => {
	    setTimeout(() => {
	        this.EffectCubo();
	    }, 20);
	};

	EffectCubo = () => {
	    /* background squares */
	    const ulSquares = document.querySelector('ul.squares');

	    for (let i = 0; i < 14; i++) {
	        const li = document.createElement('li');

	        const random = (min, max) => Math.random() * (max - min) + min;

	        const size = Math.floor(random(10, 120));
	        const position = random(1, 99);
	        const delay = random(5, 0.1);
	        const duration = random(24, 12);

	        li.style.width = `${size}px`;
	        li.style.height = `${size}px`;
	        li.style.bottom = `-${size}px`;

	        li.style.left = `${position}%`;

	        li.style.animationDelay = `${delay}s`;
	        li.style.animationDuration = `${duration}s`;
	        li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

	        ulSquares.appendChild(li);
	    }
	};

	render() {
	    return (
	        <ContainerAbout>
	            <div id="teste">
	                <section>
	                    <h1>Informações</h1>
	                    <p>
	                        <strong>
								Projeto digital do museu de história natural do
								Araguaia.
	                        </strong>
	                    </p>
	                    <br />
	                    <p>
							Este é um site de controle tanto do site público
							quanto do aplicativo do MuHNA.
	                    </p>
	                    <br />
	                    <br />
	                    <h4>Orientador:</h4>
	                    <br />
	                    <ContainerVertical>
	                        <FaUserAstronaut size={19} color="#006600" />

	                        <p>Ivairton Monteiro Santos</p>
	                    </ContainerVertical>

	                    <br />

	                    <ContainerVertical>
	                        <FaEnvelope size={19} color="#d10a0a" />

	                        <p>ivairton@ufmt.br</p>
	                    </ContainerVertical>

	                    <br />

	                    <h4>Orientando:</h4>

	                    <br />

	                    <ContainerVertical>
	                        <FaUserAstronaut size={19} color="#006600" />

	                        <p>Matheus Felipe Teodoro Correia</p>
	                    </ContainerVertical>

	                    <br />

	                    <ContainerVertical>
	                        <FaEnvelope size={19} color="#d10a0a" />

	                        <p>matheuscorreia559@gmail.com</p>
	                    </ContainerVertical>

	                    <br />
	                    <br />

	                    <div className="about-vertical-rep">
	                        <FaGithub size={20} color="#000" />
	                        <a href="https://github.com/xmatheus/internal-Muhna">
								Repositório do projeto
	                        </a>
	                    </div>
	                </section>
	            </div>

	            <ul className="squares"></ul>
	        </ContainerAbout>
	    );
	}
}
