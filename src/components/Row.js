import React from "react";

export default function Row({ guess, currentGuess }) {
	if (guess) {
		return (
			<div className="row pass">
				{guess.map((l, i) => (
					<div key={i} className={l.color}>
						{l.key}
					</div>
				))}
			</div>
		);
	}

	if (currentGuess) {
		/** Convert the string to array */
		let letters = currentGuess.split("");

		return (
			/** To display the letter on the browser */
			<div className="row current">
				{letters.map((letter, i) => (
					<div key={i} className="field">
						{letter}
					</div>
				))}
				{[...Array(5 - letters.length)].map((_, i) => (
					<div key={i}></div>
				))}
			</div>
		);
	}

	return (
		<div className="row">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
