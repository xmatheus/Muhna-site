import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	margin-bottom: 20px;
`;

export const Button = styled.button`
	border: ${props => (props.red ? '0px' : '1px solid #fff')};
	border-radius: 5px;
	padding: 10px;
	background-color: ${props =>
        props.red ? 'rgba(255, 0, 0, 1)' : 'rgba(51, 30, 4, 0)'};
	color: #fff;
	text-align: center;
	text-decoration: none;
	font-weight: bold;
	font-size: 14px;
	/* margin-right: 20px; */

	:hover {
		cursor: pointer;
		color: ${props => (props.red ? '#fff' : '#000')};
		background-color: ${props =>
        props.red ? 'rgba(150, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'};
	}
`;

export const Input = styled.input``;

export const ContainerYTLink = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 8px;
	align-items: center;
	background-color: rgb(51, 30, 4);
	height: 90vh;
	width: 75vw;
	border-radius: 20px;
	margin-top: 20px;
	padding-bottom: 40px;
`;

export const Formularios = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	margin-bottom: 10px;
	margin-top: 10px;
	width: 100%;

	input {
		color: rgb(54, 52, 52);
		width: 75%;
		height: 30px;
		border-radius: 4px;
		outline: none;
		padding: 5px;
		border: 1px solid rgb(51, 30, 4);
		:focus {
			background-color: none;
		}
	}
	button {
		background-color: rgba(0, 0, 0, 0);
		height: 30px;
		border-radius: 4px;
		border: 2px solid #fff;
		padding: 5px;
		color: #fff;
		:hover {
			background-color: rgba(255, 255, 255, 1);
			color: #000;
			cursor: pointer;
		}
	}
`;
