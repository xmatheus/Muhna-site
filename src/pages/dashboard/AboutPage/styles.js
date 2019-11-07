import styled, { keyframes } from 'styled-components';

export const ContainerAbout = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-family: Georgia, "Times New Roman", Times, serif;
	position: sticky;
	overflow: hidden;

	h1 {
		color: rgb(87, 49, 2);
		text-decoration: none;
		text-align: center;
		margin-bottom: 30px;
	}

	section {
		border-radius: 12px;
		padding: 20px;
		position: relative;
		box-shadow: 7px 9px 32px -7px rgba(0, 0, 0, 1);
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

export const ContainerVertical = styled.div`
	display: flex;
	flex-direction: row;

	p {
		padding-left: 20px;
	}
`;

export const ContainerVerticalRep = styled.div`
	display: flex;
	flex-direction: row;
	a {
		:link,
		:visited {
			padding-left: 20px;
			text-align: center;
			color: #f80000;
			text-decoration: none;
			cursor: pointer;
		}
		:link:active,
		:visited:active {
			color: #070ab6;
		}
	}
`;
