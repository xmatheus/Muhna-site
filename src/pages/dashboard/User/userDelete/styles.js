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

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 80%;
	height: 100vh;
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

export const TitleAllUsers = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	h2 {
		font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
			"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
	}
`;

export const ContainerLi = styled.div`
	li {
		display: flex;
		flex-direction: row;
		/* border: 1px solid rgb(46, 25, 1);
		border-radius: 5px; */
		padding: 8px;
		margin-bottom: 10px;
		width: 100%;
		min-height: 50px;
		padding-left: 10px;
		padding-right: 10px;
		overflow: hidden;
		justify-content: space-between;
		align-items: center;
	}
`;

export const ContainerVertical = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ContainerIconsHorizontal = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-top: 3px;
`;

export const ContainerDeleteButton = styled.div`
	margin-left: 30px;
	:hover {
		cursor: pointer;
	}
`;

export const ContainerButtonProxAndBack = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	button {
		color: #fff;
		padding: 5px;
		background-color: #09d424;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 15px;
	}
	button[disabled] {
		opacity: 0;
		cursor: not-allowed;
		pointer-events: none;
	}
	button:hover {
		background-color: #087917;
		color: #fff;
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

export const ContainerHorizontal = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	border: 1px solid rgb(46, 25, 1);
	border-radius: 5px;
	margin-bottom: 10px;
	animation: ${fade} 200ms linear;
`;
