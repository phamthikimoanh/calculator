import styled, { css } from 'styled-components';

interface ContainerFlexRowProps {
	row?: string;
	alignContent: string;
	justify: string;
	alignItems: string;
}
interface TitleProps {
	mode?: string;
	color?: string;
	textAlign?: string;
	fontWeight?: any;
}
export const Title = styled.p<TitleProps>`
	${(props) => {
		switch (props.mode) {
			case 'h1':
				return css`
					font-size: 2.5em;
					text-align: ${props.textAlign || 'left'};
					color: ${props.color || '#000'};
					font-weight: ${props.fontWeight || '700'};
				`;
			case 'h2':
				return css`
					font-size: 2em;
					text-align: ${props.textAlign || 'left'};
					color: ${props.color || '#000'};
					font-weight: ${props.fontWeight || '700'};
				`;
			case 'h3':
				return css`
					font-size: 1.5em;
					text-align: ${props.textAlign || 'left'};
					color: ${props.color || '#000'};
					font-weight: ${props.fontWeight || '700'};
				`;
			default:
				return css`
					font-size: 1em;
					color: #000;
				`;
		}
	}}
`;

export const Wrapper = styled.div`
	background: ${(props) => props.theme.bg};
	color: ${(props) => props.theme.fg};
	height: 100vh;
`;
export const Container = styled.div`
	margin: auto;
	padding: 0 20px;
	max-width: 1024px;
`;
export const ContainerFlexRow = styled.div<ContainerFlexRowProps>`
	margin: auto;
	padding: 0 20px;
	max-width: 1024px;
	display: flex;
	flex-direction: ${(props) => props.row};
	align-content: ${(props) => props.alignContent};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.alignItems};
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;
