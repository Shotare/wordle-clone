import { Component, OnInit } from "@angular/core";
import { LettersRow } from "../game-row/letters-row";
import possibleSolutions from "../../../assets/solutions.json";
import answers from "../../../assets/answers.json";
import { LetterState } from "../game-tile/letter-state";

@Component({
    selector: "game-board",
    templateUrl: "./game-board.component.html",
    styleUrls: ["./game-board.component.sass"],
})
export class GameBoardComponent implements OnInit {
    rows: LettersRow[] = [
        new LettersRow(),
        new LettersRow(),
        new LettersRow(),
        new LettersRow(),
        new LettersRow(),
        new LettersRow(),
    ];

    attempt: number = 0;
    position: number = 0;

    correctAnswer: string = "";
    currentWord: string = "";

    constructor() {
        this.correctAnswer =
            possibleSolutions[
                Math.floor(Math.random() * possibleSolutions.length)
            ];
        console.log(this.correctAnswer);
    }

    ngOnInit(): void {
        document.getElementById("game-board")?.focus();
    }

    onKeyDownEvent(event: KeyboardEvent): void {
        switch (event.key) {
            case "Enter":
                this.submitWord();
                break;
            case "Backspace":
                this.removeLetter();
                break;
            default:
                this.processKeyDown(event);
                break;
        }
    }

    private processKeyDown(event: KeyboardEvent): void {
        if (
            this.position < 5 &&
            /[a-z]/.test(event.key) &&
            event.key.length === 1
        ) {
            this.rows[this.attempt].insertLetter(event.key, this.position);
            this.currentWord += event.key;
            this.position++;
        }
    }

    private submitWord() {
        if (this.position === 5) {
            if (answers.indexOf(this.currentWord) !== -1) {
                this.analyzeSubmittedAnswer(this.currentWord);
            }
        }
    }

    private removeLetter(): void {
        if (this.position > 0) {
            this.position--;
            this.currentWord = this.currentWord.slice(0, -1);
            this.rows[this.attempt].removeLetter(this.position);
        }
    }

    private analyzeSubmittedAnswer(answer: string): void {
        // check correct letters
        let checkingAnswer = this.correctAnswer;
        for (let i = 0; i < answer.length; i++) {
            console.log(answer[i] === checkingAnswer[i]);
            if (answer[i] === checkingAnswer[i]) {
                this.rows[this.attempt].letters[i].state = LetterState.Correct;
                checkingAnswer = this.replaceCharAtIndex(checkingAnswer, " ", checkingAnswer.indexOf(answer[i]));
            }
        }

        // check yellow and gray letters
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] !== checkingAnswer[i] && checkingAnswer.includes(answer[i])) {
                this.rows[this.attempt].letters[i].state = LetterState.WrongPosition;
                checkingAnswer = this.replaceCharAtIndex(checkingAnswer, " ", checkingAnswer.indexOf(answer[i]));
                console.log(checkingAnswer);
            }
            else if (this.rows[this.attempt].letters[i].state === LetterState.TBD){
                this.rows[this.attempt].letters[i].state = LetterState.Wrong;
            }
        }

        this.prepareNextRow();
    }

    private prepareNextRow(): void {
        if (this.attempt < 5) {
            this.attempt++;
            this.position = 0;
            this.currentWord = "";
        }
    }

    private replaceCharAtIndex(text: string, replacement: string, index: number): string {
        return text.substring(0, index) + replacement + text.substring(index + 1);
    }
}
