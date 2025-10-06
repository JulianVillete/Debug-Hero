export type Question = {
	id: string
	mode: 'find' | 'fix'
	level: 1 | 2 | 3
	title: string
	language: 'javascript' | 'typescript' | 'css' | 'markup'
	code: string
	// find mode
	choices?: string[]
	answerIndex?: number
	// fix mode
	acceptedFixes?: { text: string; regex?: string }[]
	points: number
}

export const questions: Question[] = [
	{
		id: 'f1',
		mode: 'find',
		level: 1,
		title: 'Missing semicolon',
		language: 'javascript',
		code: 'const x = 5\nconsole.log(x)\n',
		choices: [
			'Line 1 is missing a semicolon',
			'Variable should be let',
			'console.log should be print',
		],
		answerIndex: 0,
		points: 10,
	},
	{
		id: 'f2',
		mode: 'find',
		level: 1,
		title: 'Loose equality issue',
		language: 'javascript',
		code: 'if (value == 0) { /* ... */ }\n',
		choices: [
			'Use === instead of ==',
			'0 should be null',
			'if should be switch',
		],
		answerIndex: 0,
		points: 10,
	},
	{
		id: 'x1',
		mode: 'fix',
		level: 1,
		title: 'Fix the typo in function name',
		language: 'typescript',
		code: 'function add(a: number, b: number) {\n  return a + b;\n}\nconsole.log(ad d(2,3));\n',
		acceptedFixes: [
			{ regex: 'add\\s*\\(2\\s*,\\s*3\\s*\\)' },
		],
		points: 15,
	},
	{
		id: 'x2',
		mode: 'fix',
		level: 2,
		title: 'Correct the if condition',
		language: 'javascript',
		code: 'const items = [];\nif (items.length = 0) {\n  console.log(\'Empty\');\n}\n',
		acceptedFixes: [
			{ text: 'items.length === 0' },
			{ text: 'items.length == 0' },
		],
		points: 20,
	},
]


