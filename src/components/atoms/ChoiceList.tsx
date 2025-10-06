import React from 'react'

export function ChoiceList({
	choices,
	onSelect,
}: {
	choices: string[]
	onSelect: (index: number) => void
}) {
	return (
		<div className="choices">
			{choices.map((c, i) => (
				<button key={i} onClick={() => onSelect(i)}>
					{c}
				</button>
			))}
		</div>
	)
}


