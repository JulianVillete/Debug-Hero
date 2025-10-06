import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism.css'

export function CodeCard({ code, language }: { code: string; language: string }) {
	const ref = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (ref.current) Prism.highlightElement(ref.current)
	}, [code, language])

	return (
		<pre className="code-card">
			<code ref={ref} className={`language-${language}`}>
				{code}
			</code>
		</pre>
	)
}


