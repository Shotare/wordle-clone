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
    }

    ngOnInit(): void {}

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
        console.log(this.currentWord);
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
        for (let i = 0; i < answer.length; i++) {
            if (this.correctAnswer.indexOf(answer[i]) === i)
                this.rows[this.attempt].letters[i].state = LetterState.Correct;
            else if (
                this.correctAnswer.indexOf(answer[i]) > -1 &&
                this.correctAnswer.indexOf(answer[i]) !== i
            )
                this.rows[this.attempt].letters[i].state =
                    LetterState.WrongPosition;
            else this.rows[this.attempt].letters[i].state = LetterState.Wrong;
        }
        this.prepareNextRow();
    }

    private prepareNextRow(): void {
        this.attempt++;
        this.position = 0;
        this.currentWord = "";
    }
}
