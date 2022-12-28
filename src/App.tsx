import { useState } from 'react';
import { Calculator } from './pages/Calculator';
import { ThemeProvider } from 'styled-components';
import { invertButton, theme } from './themes';
import { Input, LabelText, Label } from './components/InputSwitch';
import {
	Container,
	ContainerFlexRow,
	Title,
	Wrapper,
} from './components/Styles';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';

function App() {
	const [themeInvert, setThemeInvert] = useState(true);
	const handleChangeTheme = () => {
		setThemeInvert(!themeInvert);
	};
	const historyOfCalculations = useSelector(
		(state: RootState) => state.history
	);
	const renderCaculars = () => {
		return (
			<>
				{Object.values(historyOfCalculations).map(function (value, index) {
					console.log({ value });
					return (
						<p key={index} style={{ color: '#831437' }}>
							{value}
						</p>
					);
				})}
			</>
		);
	};
	return (
		<ThemeProvider
			theme={
				themeInvert ? theme.background : invertButton({ ...theme.background })
			}
		>
			<Wrapper className='App'>
				<ContainerFlexRow
					alignContent='center'
					justify='space-between'
					alignItems='center'
				>
					<Title mode='h1' color='#db7092'>
						Calculator
					</Title>
					<Label className='check-box'>
						<Input onChange={handleChangeTheme} />
						<LabelText mode='dark'></LabelText>
					</Label>
				</ContainerFlexRow>
				<ThemeProvider
					theme={themeInvert ? theme.button : invertButton({ ...theme.button })}
				>
					<ContainerFlexRow
						alignContent='flex-start'
						justify='space-between'
						alignItems='flex-start'
					>
						<Calculator />
						<Container>
							<Title mode='h3' color='#db7092'>
								History of calculations
							</Title>
							{Object.keys(historyOfCalculations).length >= 1
								? renderCaculars()
								: ''}
						</Container>
					</ContainerFlexRow>
				</ThemeProvider>
			</Wrapper>
		</ThemeProvider>
	);
}

export default App;
