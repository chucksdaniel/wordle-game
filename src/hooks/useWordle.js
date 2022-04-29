import { useState } from "react";

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuessess] = useState([...Array(6)]);
	const [history, setHistory] = useState(["hello", "start"]); // for the string element
	const [isCorrect, setIsCorrect] = useState(false);
	/**
	 * format a guess into an array of letter
	 * e.g. [{key: "a", color: "yellow"}]
	 */

	const formatGuess = () => {
		console.log("Formatting Guess - ", currentGuess);

		let solutionArray = [...solution]; // turns the string into array of individual letters

		/** To make each letter an object with key and color property
		 *  {key: l, color: green or yellow or grey}
		 *  map function map the array into a new array
		 */
		let formattedGuess = [...currentGuess].map((l) => {
			return { key: l, color: "grey" };
		});

		/** Letter in exact position
		 *  update color to green
		 */

		formattedGuess.forEach((l, i) => {
			if (solutionArray[i] === l.key) {
				formattedGuess[i].color = "green";
				solutionArray[i] = null;
			}
		});

		// For letter in the solution but not exact position
		formattedGuess.forEach((l, i) => {
			if (solutionArray.includes(l.key) && l.color !== "green") {
				formattedGuess[i].color = "yellow";
				solutionArray[solutionArray.indexOf(l.key)] = null;
			}
		});

		return formattedGuess;
	};

	/**
	 * Add a new guest to the guesses state
	 * update the isCorrect state if the guess is correct
	 * add one to the turn state
	 */
	const addNewGuess = (guess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}

		/** Track the new guess and previous ones */
		setGuessess((prevGuesses) => {
			let newGuesses = [...prevGuesses];
			newGuesses[turn] = guess;
			return newGuesses;
		});

		/** Track the number of guess and history */
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		});

		/** Increment the turn */
		setTurn((prevTurn) => {
			return prevTurn + 1;
		});

		/**Set the Cuurent Guess to empty string */
		setCurrentGuess("");
	};

	/**
	 * Handles keyup event and track current guess
	 * if the user press enter add the new guess
	 */

	const handleKeyup = (e) => {
		// console.log(e.key);

		if (e.key === "Enter") {
			// Only add Guess if turn is less than 5
			if (turn > 5) {
				console.log("You have reached your maximum guess");
				return;
			}
			// Don't allow duplicated word
			if (history.includes(currentGuess)) {
				console.log("Guess already exit! You already tried the word");
				return;
			}
			// check word is 5 character long
			if (currentGuess.length !== 5) {
				console.log("Word must be 5 character long");
				return;
			}
			/* We don't need to pass the currentGuess
            because the current guess is store in the state
            and can be accessible by formatGuess function 
         */
			const answer = formatGuess();
			addNewGuess(answer);

			// console.log(answer);
		}

		if (e.key === "Backspace") {
			setCurrentGuess((prev) => {
				// Delete the last character
				return prev.slice(0, -1);
			});
			return; // To return and not go further and wait for the key event
		}

		/* Validate that only letters is captured */
		if (/^[A-Za-z]$/.test(e.key)) {
			/* To check the length and add to the prev type letters */
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + e.key;
				});
			}
		}
	};

	return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
