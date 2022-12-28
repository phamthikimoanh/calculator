export const theme = {
	background: { fg: '#ffecec', bg: 'antiquewhite' },
	button: { fg: 'palevioletred', bg: 'white' },
	buttonTomato: { fg: 'tomato', bg: 'white' },
};

// This theme swaps `fg` and `bg`
export const invertButton = ({ fg, bg }: { fg: string; bg: string }) => ({
	fg: bg,
	bg: fg,
});
