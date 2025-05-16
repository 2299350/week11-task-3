import { useState, useEffect } from 'react';
import styles from './App.module.css';

const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

const cleanLeadingZeros = (value) => {
	return value.replace(/^0+/, '') || '0';
};

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	const handleNumberClick = (num) => {
		setIsResult(false);
		if (!operator) {
			setOperand1(cleanLeadingZeros(operand1 + num));
		} else {
			setOperand2(cleanLeadingZeros(operand2 + num));
		}
	};

	const handleOperatorClick = (op) => {
		if (operand1) {
			setOperand1(cleanLeadingZeros(operand1));
			setOperator(op);
			setIsResult(false);
		}
	};

	const handleClear = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setIsResult(false);
	};

	const handleCalculate = () => {
		if (operand1 && operator && operand2) {
			const num1 = parseInt(operand1, 10);
			const num2 = parseInt(operand2, 10);
			let result = operator === '+' ? num1 + num2 : num1 - num2;
			setOperand1(result.toString());
			setOperator('');
			setOperand2('');
			setIsResult(true);
		}
	};

	useEffect(() => {
		const handleKeyPress = (e) => {
			const key = e.key;

			if (/^[0-9]$/.test(key)) {
				setIsResult(false);
				if (!operator) {
					setOperand1(cleanLeadingZeros(operand1 + key));
				} else {
					setOperand2(cleanLeadingZeros(operand2 + key));
				}
			} else if (key === '+') {
				if (operand1) {
					setOperand1(cleanLeadingZeros(operand1));
					setOperator('+');
					setIsResult(false);
				}
			} else if (key === '-') {
				if (operand1) {
					setOperand1(cleanLeadingZeros(operand1));
					setOperator('-');
					setIsResult(false);
				}
			} else if (key === 'Enter' || key === '=') {
				if (operand1 && operator && operand2) {
					const num1 = parseInt(operand1, 10);
					const num2 = parseInt(operand2, 10);
					let result = operator === '+' ? num1 + num2 : num1 - num2;
					setOperand1(result.toString());
					setOperator('');
					setOperand2('');
					setIsResult(true);
				}
			} else if (key.toLowerCase() === 'c' || key === 'Escape') {
				setOperand1('');
				setOperator('');
				setOperand2('');
				setIsResult(false);
			} else if (key === 'Backspace') {
				setIsResult(false);
				if (!operator) {
					const newOperand1 = operand1.slice(0, -1);
					setOperand1(newOperand1 || '0');
				} else if (!operand2) {
					setOperator('');
				} else {
					const newOperand2 = operand2.slice(0, -1);
					setOperand2(newOperand2);
				}
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [operand1, operand2, operator]);

	return (
		<div className={styles.container}>
			<div className={`${styles.display} ${isResult ? styles.result : ''}`}>
				{operand1 + operator + operand2 || '0'}
			</div>

			<div className={styles.numpad}>
				{NUMS.map((num) => (
					<button
						key={num}
						className={styles.button}
						onClick={() => handleNumberClick(num)}
					>
						{num}
					</button>
				))}
				<button
					className={`${styles.button} ${styles.operator}`}
					onClick={() => handleOperatorClick('+')}
				>
					+
				</button>
				<button
					className={`${styles.button} ${styles.operator}`}
					onClick={() => handleOperatorClick('-')}
				>
					-
				</button>
				<button
					className={`${styles.button} ${styles.reset}`}
					onClick={handleClear}
				>
					Reset
				</button>
				<button
					className={`${styles.button} ${styles.wide}`}
					onClick={handleCalculate}
				>
					=
				</button>
			</div>
		</div>
	);
};
