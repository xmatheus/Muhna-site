import styled, { css } from 'styled-components';

const dragActive = css`
	border-color: #00e600;
`;

const dragReject = css`
	border-color: #da3e3e;
`;

export const DropContainer = styled.div.attrs({ className: 'dropzone' })`
	border: 2px dashed #ddd;
	border-radius: 4px;
	padding: 10px;
	cursor: pointer;
	text-align: center;

	transition: height 0.2s ease;

	${props => props.isDragActive && dragActive}
	${props => props.isDragReject && dragReject}
	position:sticky;
`;

const messageColors = {
    default: '#999',
    error: '#da3e3e',
    sucess: '#00e600'
};

export const UploadMessage = styled.p`
	display: flex;
	color: ${props => messageColors[props.type || 'default']};
	align-items: center;
	justify-content: center;
	padding: 15px;
`;
