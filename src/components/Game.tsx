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
	const [showCongrats, setShowCongrats] = useState<boolean>(false)

	const topics: Record<number, string> = {
		1: 'JavaScript',
		2: 'TypeScript',
		3: 'React',
		4: 'CSS',
		5: 'Security',
	}

	const levelQuestions = useMemo(() => {
		return questions
			.filter(q => q.level === level && q.mode === mode)
			.sort((a, b) => a.id.localeCompare(b.id))
	}, [level, mode])

	const current = levelQuestions[index]

	function shuffleChoices(choices: string[], answerIndex: number) {
		const arr = choices.map((text, idx) => ({ text, isCorrect: idx === answerIndex }))
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const tmp = arr[i]
			arr[i] = arr[j]
			arr[j] = tmp
		}
		const shuffled = arr.map(x => x.text)
		const newAnswerIndex = arr.findIndex(x => x.isCorrect)
		return { shuffled, newAnswerIndex }
	}

	const shuffledFind = useMemo(() => {
		if (!current || mode !== 'find') return null
		return shuffleChoices(current.choices!, current.answerIndex!)
		// re-shuffle only when question changes
	}, [current?.id, mode])

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
		// finished all questions at current level
		if (level < 5) {
			setIndex(0)
			setLevel(level + 1)
			return
		}
		// completed level 5: show modal
		setShowCongrats(true)
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
					<span className="topic-badge">{topics[level]}</span>
					<span>Score {score}</span>
				</div>
			</div>

			{current ? (
				<div className="question">
					<h2>{current.title}</h2>
					<CodeCard code={current.code} language={current.language} />
					{mode === 'find' ? (
						<ChoiceList
							choices={shuffledFind ? shuffledFind.shuffled : current.choices!}
							onSelect={i => {
								const correctIndex = shuffledFind ? shuffledFind.newAnswerIndex : current.answerIndex!
								if (i === correctIndex) onCorrect(current.points)
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

			{showCongrats && (
				<div className="modal-backdrop" role="dialog" aria-modal="true">
					<div className="modal">
						<h3>Congratulations!</h3>
						<p>For now this is only a demo — will be expanding soon :)<br />- Julian Villete</p>
						<div className="actions">
							<button
								onClick={() => {
									setShowCongrats(false)
									setLevel(1)
									setIndex(0)
									setScore(0)
								}}
							>
								Restart
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}


