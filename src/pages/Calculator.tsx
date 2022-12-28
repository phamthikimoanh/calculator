/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { DefaultButton, TomatoButton } from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { saveCalculation } from '../redux/reducers/historyReducer';

export const Calculator = () => {
	const [resultScreen, setResultScreen] = useState('');
	const [currentOperated, setCurrentOperated] = useState('');
	const [mathScreen, setMathScreen] = useState([]) as any[];
	const characterOperate = ['x', '/', '+', '-'];
	const characterType = ['x', '/', '+', '-', '.', '='];
	const count = useSelector((state: RootState) => state.history);
	const dispatch = useDispatch();

	const calculateOutputValue = (math: any[]) => {
		const lastPosition = math.length - 1;
		if (characterType.includes(math[lastPosition])) {
			math = math.slice(0, -1);
			setMathScreen((prevState: any[]) =>
				prevState.filter(function (item: string, index: number) {
					return item !== math[lastPosition] && index !== lastPosition;
				})
			);
		}
		let stringResult = math.join('').replaceAll('x', '*');
		let result = eval(stringResult);

		setResultScreen(result);
		setMathScreen((prevState: any[]) => [...prevState, '=', result]);
		dispatch(saveCalculation([...mathScreen, '=', result]));
	};

	const renderFormulaScreen = () => {
		return mathScreen;
	};

	const isWhatTypeTheValue = (value: string) => {
		if (value === 'x') return 1;
		if (value === '/') return 2;
		if (value === '+') return 3;
		if (value === '-') return 4;
		if (value === '.') return 5;
		if (value === '=') return 6;
		return 0;
	};

	const getLastMathValue = () => {
		// lấy ra cụm số hoặc toán tử
		const findLastIndex = (el: string) => el === currentOperated;
		const operatedPos = mathScreen.findLastIndex(findLastIndex);

		if (operatedPos > -1 && operatedPos === mathScreen.length - 1) {
			return [mathScreen[operatedPos]];
		} else {
			return mathScreen.slice(operatedPos + 1, mathScreen.length);
		}
	};
	const howManyOperated = () => {
		let count = 1;
		for (let i = 0; i < mathScreen.length - 1; i++) {
			const el = mathScreen[i];
			const nextEl = mathScreen[i + 1];

			if (characterOperate.includes(el) && characterOperate.includes(nextEl)) {
				count = 2;
			}
		}
		return count;
	};
	const isTheDuplicationValue = (
		currentValue: string,
		beforeValue: string[]
	) => {
		let convertNumber = parseFloat(beforeValue.join(''));
		if (
			(convertNumber === Number(currentValue) &&
				convertNumber === 0 &&
				Number(currentValue) === 0) ||
			(convertNumber !== Number(currentValue) &&
				beforeValue.includes('.') &&
				currentValue === '.')
		) {
			return true;
		}
		if (
			characterOperate.includes(currentValue) &&
			beforeValue[0] === currentValue
		) {
			return true;
		}
		if (
			characterOperate.includes(currentValue) &&
			beforeValue[0] === '-' &&
			beforeValue[0] === currentValue
		) {
			return true;
		}

		return false;
	};
	const typeTheValueIsNumber = (value: string) => {
		let lastValue = getLastMathValue();

		if (isTheDuplicationValue(value, lastValue)) {
			return false;
		}

		setResultScreen(resultScreen + value);
		setMathScreen((prevState: string[]) => {
			return [...prevState, value];
		});
	};
	const handleClick = (e: any) => {
		const value = e.target.value;
		const typeTheValue = isWhatTypeTheValue(value);
		let lastValue = getLastMathValue();

		if (value === 'AC') {
			setResultScreen('');
			setMathScreen([]);
			return false;
		}
		if (typeTheValue === 0) {
			typeTheValueIsNumber(value);
		}
		if (typeTheValue === 5) {
			if (isTheDuplicationValue(value, lastValue)) {
				return false;
			}

			setResultScreen(resultScreen + value);
			setMathScreen((prevState: string[]) => {
				return [...prevState, value];
			});
		}
		if (
			typeTheValue === 1 ||
			typeTheValue === 2 ||
			typeTheValue === 3 ||
			typeTheValue === 4
		) {
			if (mathScreen.includes('=') && characterOperate.includes(value)) {
				setResultScreen('0');
				setMathScreen([resultScreen]);
			}
			const numOperated = howManyOperated();
			if (numOperated === 2) {
				setMathScreen((prevState: any[]) => prevState.slice(0, -2));
			}
			if (isTheDuplicationValue(value, lastValue)) {
				return false;
			}
			setCurrentOperated(value);
			setResultScreen(value);
			setMathScreen((prevState: string[]) => {
				return [...prevState, value];
			});
		}

		if (value === '=') {
			if (
				mathScreen.length > 0 &&
				!(resultScreen === 'NaN' || mathScreen.includes('NaN'))
			) {
				calculateOutputValue(mathScreen);
			} else {
				setResultScreen('NaN');
				setMathScreen(['NaN']);
			}
		}
	};

	return (
		<div className='calculator'>
			<div className='infor'>
				<div className='formulaScreen'>{renderFormulaScreen()}</div>
				<div className='outPutScreen' id='display'>
					{resultScreen || 0}
				</div>
			</div>
			<div className='wrapper-calculator'>
				<TomatoButton
					className='jumbo'
					id='clear'
					value='AC'
					onClick={(e) => handleClick(e)}
				>
					AC
				</TomatoButton>
				<DefaultButton id='divide' value='/' onClick={(e) => handleClick(e)}>
					/
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='multiply' value='x'>
					x
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='seven' value={7}>
					7
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='eight' value={8}>
					8
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='nine' value={9}>
					9
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='subtract' value='-'>
					-
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='four' value={4}>
					4
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='five' value={5}>
					5
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='six' value={6}>
					6
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='add' value='+'>
					+
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='one' value={1}>
					1
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='two' value={2}>
					2
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='three' value={3}>
					3
				</DefaultButton>
				<DefaultButton
					className='jumbo'
					onClick={(e) => handleClick(e)}
					id='zero'
					value='0'
				>
					0
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='decimal' value='.'>
					.
				</DefaultButton>
				<DefaultButton onClick={(e) => handleClick(e)} id='equals' value='='>
					=
				</DefaultButton>
			</div>
		</div>
	);
};
