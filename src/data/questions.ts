export type Question = {
	id: string
	mode: 'find' | 'fix'
	level: 1 | 2 | 3 | 4 | 5
	title: string
	language: 'javascript' | 'typescript' | 'css' | 'markup'
	code: string
	// find mode
	choices?: string[]
	answerIndex?: number
	// fix mode
	acceptedFixes?: { text?: string; regex?: string }[]
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
	// Level 2 - find
	{
		id: 'f3',
		mode: 'find',
		level: 2,
		title: 'Array mutation in React state',
		language: 'javascript',
		code: 'const [list, setList] = useState([1,2]);\nlist.push(3);\nsetList(list);\n',
		choices: [
			"Don't mutate state directly; use setList([...list, 3])",
			'push should be concat',
			'list should be const',
		],
		answerIndex: 0,
		points: 15,
	},
	// Level 3 - find
	{
		id: 'f4',
		mode: 'find',
		level: 3,
		title: 'Missing dependency in useEffect',
		language: 'javascript',
		code: 'useEffect(() => {\n  fetchData(id);\n}, []);\n',
		choices: [
			'Add id to dependency array',
			'Remove useEffect',
			'Wrap fetchData in setTimeout',
		],
		answerIndex: 0,
		points: 20,
	},
	// Level 4 - find
	{
		id: 'f5',
		mode: 'find',
		level: 4,
		title: 'Async/await not awaited',
		language: 'javascript',
		code: 'async function load(){\n  const data = fetch(\'/api\');\n  console.log(await data.json());\n}\n',
		choices: [
			'Await fetch: const res = await fetch(...)',
			'Use .then instead of await',
			'Make function non-async',
		],
		answerIndex: 0,
		points: 25,
	},
	// Level 4 - find (CSS)
	{
		id: 'f7',
		mode: 'find',
		level: 4,
		title: 'Specificity issue hides button hover',
		language: 'css',
		code: '.btn { color: white; }\n.button:hover { color: red; }\n',
		choices: [
			'Use matching selector: .btn:hover',
			'Inline styles are required',
			'!important on :hover only',
		],
		answerIndex: 0,
		points: 25,
	},
	// Level 5 - find
	{
		id: 'f6',
		mode: 'find',
		level: 5,
		title: 'Dangerous innerHTML',
		language: 'javascript',
		code: 'element.innerHTML = userInput;\n',
		choices: [
			'Sanitize or avoid innerHTML to prevent XSS',
			'Use textContent for HTML parsing',
			'Use eval for validation',
		],
		answerIndex: 0,
		points: 30,
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
	// Level 3 - fix
	{
		id: 'x3',
		mode: 'fix',
		level: 3,
		title: 'Fix missing return type',
		language: 'typescript',
		code: 'const isEven = (n) => { return n % 2 === 0 }\n',
		acceptedFixes: [
			{ regex: 'const\\s+isEven\\s*=\\s*\\(n: \\s*number\\s*\\)' },
			{ regex: '\\)\\s*:\\s*boolean' },
		],
		points: 20,
	},
	// Level 4 - fix
	{
		id: 'x4',
		mode: 'fix',
		level: 4,
		title: 'Proper null check',
		language: 'javascript',
		code: 'function greet(name){\n  if (name) { console.log(\'Hi \' + name); }\n}\n',
		acceptedFixes: [
			{ regex: 'if \\(name != null\\)' },
			{ regex: 'if \\(name !== null && name !== undefined\\)' },
		],
		points: 25,
	},
	// Level 5 - fix
	{
		id: 'x5',
		mode: 'fix',
		level: 5,
		title: 'Optimize loop with map',
		language: 'javascript',
		code: 'const out = [];\nfor (let i=0;i<arr.length;i++){ out.push(arr[i]*2) }\n',
		acceptedFixes: [
			{ regex: 'arr\\.map\\(.*=>.*\\*\\s*2\\)' },
		],
		points: 30,
	},
	// Level 4 - fix (CSS)
	{
		id: 'x6',
		mode: 'fix',
		level: 4,
		title: 'Center a div properly',
		language: 'css',
		code: '.box { width: 200px; height: 200px; margin: auto 0; }\n',
		acceptedFixes: [
			{ regex: 'display:\\s*flex' },
			{ regex: 'margin:\\s*0\\s*auto' },
			{ regex: 'place-items:\\s*center' },
		],
		points: 25,
	},
]


