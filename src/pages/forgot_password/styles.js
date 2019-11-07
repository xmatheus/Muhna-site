import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
`;

export const Container = styled.div`
	display: flex;
	background-color: rgb(255, 255, 255);
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: fixed;
`;

export const ContainerLogin = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	border-radius: 7px;
	/* background: rgba(0, 0, 0, 0.5); */
	background: #351d05;
	width: 20%;
	min-width: 350px;
	box-shadow: 7px 9px 32px -7px rgba(0, 0, 0, 1);

	animation-name: ${fade};
	animation-duration: 500ms;

	h1 {
		text-align: center;
		padding-bottom: 20px;
		color: #fafafa;
	}

	img {
		width: 50%;
	}

	input {
		margin-top: 5px;
		margin-bottom: 20px;
		width: 100%;
		height: 35px;
		border-radius: 4px;
		padding: 12px 10px;
		box-sizing: border-box;
		color: #080808e7;
		font-size: 16px;
		display: inline-block;
		border: 1px solid rgb(44, 25, 2);
		background-color: none;

		-webkit-transition: font-size 0.4s ease-in-out;
		transition: font-size 0.4s ease-in-out;

		:focus {
			font-size: 19px;
		}
	}

	button {
		display: flexbox;
		padding: 5px 5px;
		color: #fafafa;
		border-radius: 3px;
		background-color: rgba(0, 0, 0, 0);
		border: 1px solid #fafafa;
		font-weight: bold;

		overflow: hidden;
		text-align: center;
		font-size: 1vh;
		margin-top: 15px;

		:hover {
			color: #000;
			background: #fafafa;
			cursor: pointer;
		}
	}

	p {
		animation: fade 250ms;
		text-align: center;
		animation-fill-mode: backwards;
		font-family: "Lucida Console", Monaco, monospace;
		color: #fafafa;
		font-size: 20px;
		padding: 5px;
		background: #ff1a1a;
		border-radius: 4px;
		margin: 15px 0px;
	}

	form {
		display: flex;
		font-size: 18px;
		color: #fafafa;
		font-family: Arial, Helvetica, sans-serif;
		flex-direction: column;
		width: 100%;
		color: #fafafa;

		label {
			justify-items: flex-end;
		}
	}

	h3 {
		color: rgb(0, 255, 0);
	}
`;

export const ContainerChangePassword = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 20px;

	button {
		box-shadow: 0px 0px;
		border-radius: 2px;
		margin: 0px 0px;
		padding: 5px 5px;
		text-align: center;
		font-size: 0.8vw;
	}
`;

export const ErroLabel = styled.label`
	color: rgba(255, 255, 255, 1);
	font-size: 18px;
	font-weight: bolder;
	padding: 2px;
	border: 1px solid rgba(255, 0, 0, 1);
	border-radius: 5px;
	margin-left: 5px;
	text-align: center;
`;

export const ContainerButtons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;
