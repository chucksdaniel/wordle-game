import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

export default function Wordle({ solution }) {
	const { currentGuess, handleKeyup, guesses, isCorrect, turn } =
		useWordle(solution);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyup);

		return () => window.removeEventListener("keyup", handleKeyup);
	});

	useEffect(() => {
		console.log(guesses, isCorrect, turn);
	}, [guesses, isCorrect, turn]);

	return (
		<div>
			<div>Solution = {solution}</div>
			<div>Current Guess:- {currentGuess} </div>
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
		</div>
	);
}
