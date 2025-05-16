import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';

const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

const cleanLeadingZeros = (value) => value.replace(/^0+/, '') || '0';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	const handleInput = useCallback(
		(value) => {
			if (/^[0-9]$/.test(value)) {
				setIsResult(false);
				if (!operator) {
					setOperand1(cleanLeadingZeros(operand1 + value));
				} else {
					setOperand2(cleanLeadingZeros(operand2 + value));
				}
			} else if (value === '+' || value === '-') {
				if (operand1 && operator && operand2) {
					const num1 = parseInt(operand1, 10);
					const num2 = parseInt(operand2, 10);
					const result = operator === '+' ? num1 + num2 : num1 - num2;
					setOperand1(result.toString());
					setOperand2('');
					setOperator(value);
					setIsResult(false);
				} else if (operand1) {
					setOperand1(cleanLeadingZeros(operand1));
					setOperator(value);
					setIsResult(false);
				}
			} else if (value === 'Enter' || value === '=') {
				if (operand1 && operator && operand2) {
					const num1 = parseInt(operand1, 10);
					const num2 = parseInt(operand2, 10);
					const result = operator === '+' ? num1 + num2 : num1 - num2;
					setOperand1(result.toString());
					setOperator('');
					setOperand2('');
					setIsResult(true);
				}
			} else if (value.toLowerCase() === 'c' || value === 'Escape') {
				setOperand1('');
				setOperator('');
				setOperand2('');
				setIsResult(false);
			} else if (value === 'Backspace') {
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
		},
		[operand1, operator, operand2],
	);

	useEffect(() => {
		const handleKeyListener = (e) => {
			handleInput(e.key);
		};

		window.addEventListener('keydown', handleKeyListener);
		return () => window.removeEventListener('keydown', handleKeyListener);
	}, [handleInput]);

	return (
		<div className={styles.container}>
			<div className={`${styles.display} ${isResult ? styles.result : ''}`}>
				{operand1 + operator + operand2 || '0'}
			</div>

			<div className={styles.numpad}>
				{NUMS.map((num) => (
					<button
						key={`num-${num}`}
						className={styles.button}
						onMouseDown={(e) => e.preventDefault()}
						onClick={() => handleInput(num)}
					>
						{num}
					</button>
				))}
				<button
					key="op-plus"
					className={`${styles.button} ${styles.operator}`}
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => handleInput('+')}
				>
					+
				</button>
				<button
					key="op-minus"
					className={`${styles.button} ${styles.operator}`}
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => handleInput('-')}
				>
					-
				</button>
				<button
					key="reset"
					className={`${styles.button} ${styles.reset}`}
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => handleInput('c')}
				>
					Reset
				</button>
				<button
					key="equal"
					className={`${styles.button} ${styles.wide}`}
					onMouseDown={(e) => e.preventDefault()}
					onClick={() => handleInput('=')}
				>
					=
				</button>
			</div>
		</div>
	);
};
