import {v4 as uuidv4} from "uuid";

class GuessManager {
    guesses = [];

    constructor(onChange, onSuccessfulGuess) {
        this.setCallbacks(onChange, onSuccessfulGuess);
    }

    setCallbacks(onChange, onSuccessfulGuess) {
        this.onChange = onChange;
        this.onSuccessfulGuess = onSuccessfulGuess;
    }

    add(name, pos, time) {
        this.guesses.push(new Guess(this, name, pos, time));
        this.onChange(this.guesses);
    }

    remove(item) {
        const itemId = this.guesses.findIndex((g) => item === g);
        if (itemId === -1) { return; }
        this.guesses.splice(itemId, 1);
        this.onChange(this.guesses);
    }

    guessChecked(name, success) {
        this.onChange(this.guesses);
        if (success) {
            this.onSuccessfulGuess(name);
        }
    }
}

class Guess {
    renderId = uuidv4();
    isChecked = false;
    isCorrect = false;

    constructor(parent, name, pos, time) {
        this.parent = parent
        this.name = name;
        this.pos = pos;

        //TODO: check guess with the database
        new Promise((resolve, reject) => {setTimeout(() => resolve(false), 3000)})
        .then((correct) => {
            this.isChecked = true;
            this.isCorrect = correct;
            this.parent.guessChecked(this.name, this.isCorrect);
            setTimeout(() => this.parent.remove(this), time);
        });
    }
}

export default GuessManager;
