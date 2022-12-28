import styled, { css } from 'styled-components';

export const Input = styled.input.attrs({ type: 'checkbox' })``;

interface Props {
	mode: string;
}
export const Label = styled.label`
	position: relative;
	top: 0;
	left: 0;
	color: white;
	input {
		position: relative;
		appearance: none;
		width: 40px;
		height: 20px;
		background: antiquewhite;
		border-radius: 50px;
		box-shadow: inset 0 0 5px #d4d4d4;
		cursor: pointer;
		transition: 0.4s;
	}
	input::after {
		position: absolute;
		content: '';
		width: 20px;
		height: 20px;
		top: 0;
		left: 0;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 5px #d4d4d4;
		transform: scale(1.1);
		transition: 0.4s;
	}
	input:checked {
		background: palevioletred;
	}
	input:checked::after {
		left: 50%;
	}
`;
export const LabelText = styled.span<Props>`
	${(props) => {
		switch (props.mode) {
			case 'dark':
				return css`
					background-color: black;
					color: white;
					${Input}:checked + && {
						color: blue;
					}
				`;
			default:
				return css`
					background-color: white;
					color: black;
					${Input}:checked {
						color: red;
					}
				`;
		}
	}}
`;
