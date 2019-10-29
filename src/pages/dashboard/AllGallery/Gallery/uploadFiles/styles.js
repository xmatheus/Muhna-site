import styled from 'styled-components';

export const Content = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 30px;
	padding: 20px;
	overflow-y: auto;
	border: 1px solid "#2c1902";

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 8px;
	align-items: center;
	background-color: rgb(51, 30, 4);
	height: 90vh;
	border-radius: 20px;
	margin-top: 20px;
	padding-bottom: 40px;
`;

export const Button = styled.button`
	margin-top: 5px;
	padding: 7px;
	background-color: rgba(255, 255, 255, 0);
	border: 2px solid #fafafa;
	border-radius: 10px;
	color: #fafafa;
	font-size: 20px;
	font-weight: bold;
	font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;

	&:hover {
		border-color: #000;
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
`;
