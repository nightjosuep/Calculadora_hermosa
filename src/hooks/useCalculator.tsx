	import { useState } from 'react';

	interface CalculatorState {
		display: string;
		expression: string;
		lastAnswer: number;
		justEvaluated: boolean;
	}

	const initialState: CalculatorState = {
		display: '0',
		expression: '',
		lastAnswer: 0,
		justEvaluated: false,
	};

	const formatNumber = (value: number) => {
		if (!Number.isFinite(value)) return 'Error';
		return String(Number(value.toPrecision(12)));
	};

	const evaluateExpression = (expression: string, lastAnswer: number) => {
		const tokens: string[] = [];
		const tokenPattern = /\s*(ANS|sin|cos|tan|sqrt|log|ln|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?|[()+\-*/^%×÷])/iy;
		let tokenPosition = 0;
		const input = expression.trim();

		while (tokenPosition < input.length) {
			tokenPattern.lastIndex = tokenPosition;
			const match = tokenPattern.exec(input);
			if (!match) throw new Error('Invalid expression');
			tokens.push(match[1].toLowerCase() === 'ans' ? 'ANS' : match[1]);
			tokenPosition = tokenPattern.lastIndex;
		}

		let position = 0;
		const parseExpression = (): number => {
			let value = parseTerm();
			while (tokens[position] === '+' || tokens[position] === '-') {
				const operator = tokens[position++];
				const right = parseTerm();
				value = operator === '+' ? value + right : value - right;
			}
			return value;
		};
		const parseTerm = (): number => {
			let value = parseUnary();
			while (tokens[position] === '*' || tokens[position] === '/' || tokens[position] === '×' || tokens[position] === '÷') {
				const operator = tokens[position++];
				const right = parseUnary();
				if ((operator === '/' || operator === '÷') && right === 0) throw new Error('Division by zero');
				value = operator === '*' || operator === '×' ? value * right : value / right;
			}
			return value;
		};
		const parseUnary = (): number => {
			if (tokens[position] === '+') {
				position += 1;
				return parseUnary();
			}
			if (tokens[position] === '-') {
				position += 1;
				return -parseUnary();
			}
			return parsePower();
		};
		const parsePower = (): number => {
			let value = parsePrimary();
			while (tokens[position] === '%') {
				position += 1;
				value /= 100;
			}
			if (tokens[position] === '^') {
				position += 1;
				value = Math.pow(value, parseUnary());
			}
			return value;
		};
		const parsePrimary = (): number => {
			const token = tokens[position++];
			if (token === undefined) throw new Error('Incomplete expression');
			if (token === '(') {
				const value = parseExpression();
				if (tokens[position++] !== ')') throw new Error('Missing closing parenthesis');
				return value;
			}
			if (token === 'ANS') return lastAnswer;
			if (/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(token)) return Number(token);
			if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln'].includes(token)) {
				if (tokens[position++] !== '(') throw new Error('Function needs parentheses');
				const argument = parseExpression();
				if (tokens[position++] !== ')') throw new Error('Missing closing parenthesis');
				switch (token) {
					case 'sin':
						return Math.sin((argument * Math.PI) / 180);
					case 'cos':
						return Math.cos((argument * Math.PI) / 180);
					case 'tan': {
						const radians = (argument * Math.PI) / 180;
						if (Math.abs(Math.cos(radians)) < Number.EPSILON * 8) return NaN;
						return Math.tan(radians);
					}
					case 'sqrt':
						return Math.sqrt(argument);
					case 'log':
						return Math.log10(argument);
					default:
						return Math.log(argument);
				}
			}
			throw new Error('Unexpected token');
		};

		const result = parseExpression();
		if (position !== tokens.length || !Number.isFinite(result)) throw new Error('Invalid result');
		return result;
	};

	const needsOperand = (expression: string) => /[+\-×÷^(]\s*$/.test(expression) || expression.trim() === '';
	const endsWithValue = (expression: string) => /(?:\d|\)|%|ANS)\s*$/i.test(expression);

	export const useCalculator = () => {
		const [state, setState] = useState(initialState);

		const press = (label: string) => {
			setState((current) => {
				if (label === 'AC') return { ...initialState, lastAnswer: current.lastAnswer };
				if (current.display === 'Error') return current;

				if (/^\d$/.test(label)) {
					const base = current.justEvaluated ? '' : current.expression;
					const trimmed = base.trimEnd();
					const implicitMultiply = !current.justEvaluated && endsWithValue(trimmed) && /[)%]$/.test(trimmed);
					const startsOperand = current.justEvaluated || needsOperand(trimmed) || implicitMultiply;
					const expression = current.justEvaluated
						? label
						: `${base}${implicitMultiply ? ' × ' : ''}${label}`;
					const display = startsOperand || current.display === '0' && !trimmed
						? label
						: current.display + label;
					return { ...current, expression, display, justEvaluated: false };
				}

				if (label === '.') {
					if (!current.justEvaluated && !needsOperand(current.expression) && current.display.includes('.')) return current;
					const startsOperand = current.justEvaluated || needsOperand(current.expression);
					return {
						...current,
						expression: `${current.justEvaluated ? '' : current.expression}${startsOperand ? '0.' : '.'}`,
						display: startsOperand ? '0.' : `${current.display}.`,
						justEvaluated: false,
					};
				}

				if (label === '+/-') {
					const value = Number(current.display);
					if (!Number.isFinite(value)) return current;
					const nextDisplay = value < 0 ? formatNumber(Math.abs(value)) : `-${formatNumber(value)}`;
					const expression = current.justEvaluated
						? nextDisplay
						: current.expression.endsWith(current.display)
							? `${current.expression.slice(0, -current.display.length)}${nextDisplay}`
							: current.expression || nextDisplay;
					return { ...current, expression, display: nextDisplay, justEvaluated: false };
				}

				if (label === '%') {
					const base = current.justEvaluated ? current.display : current.expression;
					if (!base || !endsWithValue(base)) return current;
					const expression = `${base}%`;
					try {
						return { ...current, expression, display: formatNumber(evaluateExpression(expression, current.lastAnswer)), justEvaluated: false };
					} catch {
						return current;
					}
				}

				if (label === '=') {
					if (!current.expression.trim()) return current;
					try {
						const result = evaluateExpression(current.expression, current.lastAnswer);
						return { ...current, display: formatNumber(result), lastAnswer: result, justEvaluated: true };
					} catch {
						return { ...current, display: 'Error', justEvaluated: false };
					}
				}

				if (label === 'ANS') {
					const base = current.justEvaluated ? '' : current.expression;
					const expression = base && endsWithValue(base.trimEnd()) ? `${base} × ANS` : `${base}ANS`;
					return { ...current, expression, display: formatNumber(current.lastAnswer), justEvaluated: false };
				}

				if (label === '(') {
					const base = current.justEvaluated ? '' : current.expression;
					const expression = base && endsWithValue(base.trimEnd()) ? `${base} × (` : `${base}(`;
					return { ...current, expression, display: '0', justEvaluated: false };
				}

				if (label === ')') {
					const openCount = (current.expression.match(/\(/g) ?? []).length;
					const closeCount = (current.expression.match(/\)/g) ?? []).length;
					if (openCount <= closeCount || !endsWithValue(current.expression.trimEnd())) return current;
					const expression = `${current.expression})`;
					try {
						return { ...current, expression, display: formatNumber(evaluateExpression(expression, current.lastAnswer)) };
					} catch {
						return { ...current, expression };
					}
				}

				const functionTokens: Record<string, string> = { sin: 'sin(', cos: 'cos(', tan: 'tan(', '√': 'sqrt(', log: 'log(' };
				if (functionTokens[label]) {
					const base = current.justEvaluated ? '' : current.expression;
					const expression = base && endsWithValue(base.trimEnd())
						? `${base} × ${functionTokens[label]}`
						: `${base}${functionTokens[label]}`;
					return { ...current, expression, display: '0', justEvaluated: false };
				}

			const operator = label === 'a/b' ? '÷' : label;
			if (['+', '-', '×', '÷', '^'].includes(operator)) {
				const base = current.justEvaluated ? current.display : current.expression;
				const trimmed = base.trimEnd();
				if (!trimmed) return operator === '-' ? { ...current, expression: '-', display: '0', justEvaluated: false } : current;
				if (/[+\-×÷^]\s*$/.test(base)) {
					return { ...current, expression: `${base.replace(/[+\-×÷^]\s*$/, '')} ${operator} `, justEvaluated: false };
				}
				if (trimmed.endsWith('(')) return operator === '-' ? { ...current, expression: `${base}-`, justEvaluated: false } : current;
				return { ...current, expression: `${base} ${operator} `, justEvaluated: false };
			}

			return current;
		});
		};

		return {
			display: state.display,
			expression: state.expression,
			press,
		};
	};
    