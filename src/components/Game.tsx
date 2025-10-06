import React, { useMemo, useState } from 'react'
import { CodeCard } from './atoms/CodeCard'
import { ChoiceList } from './atoms/ChoiceList'
import { FixInput } from './atoms/FixInput'
import { questions } from '../data/questions'

type Mode = 'find' | 'fix'

export function Game() {
	const [mode, setMode] = useState<Mode>('find')
	const [level, setLevel] = useState<number>(1)
	const [index, setIndex] = useState<number>(0)
	const [score, setScore] = useState<number>(0)
	const [feedback, setFeedback] = useState<string>('')

	const levelQuestions = useMemo(() => {
		return questions
			.filter(q => q.level === level && q.mode === mode)
			.sort((a, b) => a.id.localeCompare(b.id))
	}, [level, mode])

	const current = levelQuestions[index]

	function onCorrect(points: number) {
		setScore(prev => prev + points)
		setFeedback('Correct!')
		setTimeout(() => {
			setFeedback('')
			next()
		}, 600)
	}

	function onWrong() {
		setFeedback('Try again')
		setTimeout(() => setFeedback(''), 800)
	}

	function next() {
		if (index + 1 < levelQuestions.length) {
			setIndex(index + 1)
			return
		}
		// next level or loop
		setIndex(0)
		setLevel(prev => (prev < 3 ? prev + 1 : 1))
	}

	return (
		<div className="game">
			<div className="toolbar">
				<div className="modes">
					<button
						className={mode === 'find' ? 'active' : ''}
						onClick={() => {
							setMode('find')
							setIndex(0)
						}}
					>
						Find the bug
					</button>
					<button
						className={mode === 'fix' ? 'active' : ''}
						onClick={() => {
							setMode('fix')
							setIndex(0)
						}}
					>
						Fix it
					</button>
				</div>
				<div className="status">
					<span>Level {level}</span>
					<span>Score {score}</span>
				</div>
			</div>

			{current ? (
				<div className="question">
					<h2>{current.title}</h2>
					<CodeCard code={current.code} language={current.language} />
					{mode === 'find' ? (
						<ChoiceList
							choices={current.choices!}
							onSelect={i => {
								if (i === current.answerIndex) onCorrect(current.points)
								else onWrong()
							}}
						/>
					) : (
						<FixInput
							placeholder="Type the fix..."
							onSubmit={text => {
								const ok = current.acceptedFixes!.some(accept =>
									accept.regex
										? new RegExp(accept.regex, 'i').test(text)
									: accept.text.trim().toLowerCase() === text.trim().toLowerCase(),
								)
								if (ok) onCorrect(current.points)
								else onWrong()
							}}
						/>
					)}
					{feedback && <div className={`feedback ${feedback === 'Correct!' ? 'ok' : 'no'}`}>{feedback}</div>}
				</div>
			) : (
				<p>No questions for this level/mode.</p>
			)}
		</div>
	)
}


