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

export const TitleAllUsers = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	h2 {
		font-size: 1.8vw;
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
		/* min-height: 50px; */
		padding-left: 10px;
		padding-right: 10px;
		justify-content: space-between;
		align-items: center;
		overflow-x: auto;
	}
`;

export const ContainerVertical = styled.div`
	display: flex;
	flex-direction: column;

	h4 {
		font-size: 1.2vw;
	}
`;

export const ContainerIconsHorizontal = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-top: 3px;

	span {
		font-size: 0.9vw;
	}
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

export const LabelPages = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
