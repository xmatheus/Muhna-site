import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 20px;
	overflow-y: auto;

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: "#444";

		& + li {
			margin-top: 15px;
		}

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			button {
				background: transparent;
				color: #da3e3e;
				padding: 2px;
				border: 1px solid #da3e3e;
				border-radius: 4px;
				margin-right: 15px;
				cursor: pointer;
			}
			button:hover {
				background: #da3e3e;
				color: white;
			}
		}
	}
`;

export const FileInfo = styled.div`
	display: flex;
	align-items: center;

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		span {
			font-size: 10px;
			color: #999;
			margin-top: 5px;
		}

		strong {
			font-size: 16px;
			text-align: left;
			color: #f2f2f2;
			margin-right: 5px;
		}
	}
`;
export const Preview = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 5px;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	margin-right: 10px;
`;
