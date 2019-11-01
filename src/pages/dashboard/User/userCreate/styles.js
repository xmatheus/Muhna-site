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
	min-height: 300px;
`;

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 80%;
	height: 100vh;
`;

export const ContainerCheckBox = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	flex-direction: row;

	label {
		font-size: 15px;
		color: #423e3e;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
`;

export const ErroLabel = styled.label`
	color: rgba(255, 0, 0, 1);
	font-size: 18px;
	font-weight: bolder;
	padding: 2px;
	border: 1px solid rgba(255, 0, 0, 1);
	border-radius: 5px;
	margin-left: 5px;
`;

export const DefaultLabel = styled.label`
	color: black;
	font-size: 18px;
	font-weight: bold;
`;

export const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	width: 60%;
	height: 75%;
	padding: 20px;
	overflow-y: auto;
	overflow-x: hidden;
	position: sticky;
	background-color: #ffffff;

	/* box-shadow: 7px 9px 18px -1px rgba(0, 0, 0, 1); */
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

export const ContainerButtonSendUSer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding-top: 60px;
	height: 30%;

	button {
		border: 0px;
		border-radius: 5px;
		padding: 10px;
		background-color: #06b61d;
		color: #fff;
		text-align: center;
		text-decoration: none;
		font-weight: bold;
		font-size: 14px;
		margin-top: 20px;

		:hover {
			background-color: rgb(9, 83, 19);
			cursor: pointer;
		}
	}
`;

export const PacmanLoad = styled.div`
	display: flex;
	width: 100%;
	min-height: 80px;
	min-width: 120px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	animation: ${fade} 200ms linear;
`;
