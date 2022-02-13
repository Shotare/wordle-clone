import { Letter } from "../game-tile/letter";

export class LettersRow {
    letters: Letter[];

    constructor() {
        this.letters = [
            new Letter(),
            new Letter(),
            new Letter(),
            new Letter(),
            new Letter(),
        ];
    }

    public insertLetter(letter: string, position: number): void {
        this.letters[position].value = letter;
    }

    public removeLetter(position: number): void {
        this.letters[position].value = "";
    }
}
