export class LettersRow {
    letters: string[];

    constructor() {
        this.letters = ["", "", "", "", ""];
    }

    public insertLetter(letter: string, position: number) {
        this.letters[position] = letter;
    }
}
