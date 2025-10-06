import { useState } from 'react'

export function FixInput({ placeholder, onSubmit }: { placeholder?: string; onSubmit: (text: string) => void }) {
	const [text, setText] = useState('')

	return (
		<form
			className="fix-input"
			onSubmit={e => {
				e.preventDefault()
				onSubmit(text)
				setText('')
			}}
		>
			<input
				type="text"
				value={text}
				placeholder={placeholder}
				onChange={e => setText(e.target.value)}
			/>
			<button type="submit">Submit</button>
		</form>
	)
}


