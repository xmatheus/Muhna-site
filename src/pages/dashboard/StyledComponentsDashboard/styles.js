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
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
	overflow-x: hidden;
	padding-top: 80px;
	position: sticky;
	overflow: hidden;
	animation: ${fade} 250ms linear;
`;

export const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	width: 60%;
	height: 90%;
	padding: 20px;
	overflow-y: auto;
	overflow-x: hidden;
	position: sticky;
	background-color: #ffffff;

	justify-content: space-between;
	/* align-items: center; */

	box-shadow: 7px 9px 32px -7px rgba(0, 0, 0, 1);
	input {
		margin-top: 5px;
		margin-bottom: 20px;
		width: 100%;
		height: 35px;
		border-radius: 4px;
		padding: 12px 20px;
		box-sizing: border-box;
		color: #000000c2;
		font-size: 16px;
		display: inline-block;
		border: 1px solid rgb(44, 25, 2);
		background-color: none;

		:-webkit-autofill,
		:-webkit-autofill:hover,
		:-webkit-autofill:focus,
		:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 30px white inset !important;
		}
	}
`;

export const PacmanLoad = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	animation: ${fade} 200ms linear;
`;

export const ContainerUploadFiles = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	height: 90%;
	padding: 20px;
	overflow-y: auto;
	position: sticky;
	background-color: #ffffff;
	justify-content: center;
	overflow-y: auto;
	align-items: center;
	box-shadow: 7px 9px 32px -7px rgba(0, 0, 0, 1);
	animation: leftToRight 250ms linear;
	animation-delay: 100;
	animation-fill-mode: backwards;

	h1 {
		text-align: center;
	}
`;

export const BotaoVerde = styled.button`
	border: 0px;
	border-radius: 5px;
	padding: 10px;
	background-color: #06b61d;
	color: #fff;
	text-align: center;
	text-decoration: none;
	font-weight: bold;
	font-size: 14px;

	:hover {
		background-color: rgb(9, 83, 19);
		cursor: pointer;
	}
`;

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 80%;
	height: 100vh;
`;
