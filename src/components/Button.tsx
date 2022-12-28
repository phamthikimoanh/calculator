import styled from 'styled-components';

interface Props {
	theme: any;
	onClick: (e: any) => void;
}
export const DefaultButton = styled.button<Props>`
	/* Adapt the colors based on primary prop */
	background: ${(props) => props.theme.bg};
	color: ${(props) => props.theme.fg};

	font-size: 2em;
	margin: 0.1em;
	padding: 0.5em;
	border: 2px solid palevioletred;
	border-radius: 3px;
	cursor: pointer;
	height: 65px;
	width: 79px;
	&:hover {
		color: #800035;
		box-shadow: inset 1px 1px 4px 0px #800035c4;
	}
`;
export const TomatoButton = styled(DefaultButton)`
	border-color: tomato;
	background: ${(props) => props.theme.bg};
	color: ${(props) => props.theme.fg};
`;
