import { Component, OnInit } from "@angular/core";
import { LettersRow } from "../game-row/letters-row";
import possibleSolutions from "../../../assets/solutions.json";
import answers from "../../../assets/answers.json";
import { LetterState } from "../game-tile/letter-state";
import { LetterPositionPair } from "./letter-position-pair";

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
    correctAnswerLettersPostions: LetterPositionPair[] = [];
    currentWord: string = "";

    constructor() {
        this.correctAnswer = "essay";
            // possibleSolutions[
            //     Math.floor(Math.random() * possibleSolutions.length)
            // ];
        for (let i = 0; i < this.correctAnswer.length; i++) {
            this.correctAnswerLettersPostions.push(new LetterPositionPair(this.correctAnswer[i], i));
        }
        console.log(this.correctAnswer);
        console.log(this.correctAnswerLettersPostions);
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
        //TODO: If a word has two same letters, e.g. 'essay'
        //it colors the second letter yellow - FIX
        let correctAnswerClone = this.cloneAnswerLetters(this.correctAnswerLettersPostions);
        for (let i = 0; i < answer.length; i++) {
            if (correctAnswerClone.some(letter => letter.letter === answer[i] && letter.position === i)) {
                console.log(`Case: correct letter: ${answer[i]}, index: ${i}`);
                this.rows[this.attempt].letters[i].state = LetterState.Correct;
                correctAnswerClone = correctAnswerClone.filter(pair => pair.position !== i);
                console.log(correctAnswerClone);
                console.log(" ");
            }
            else if (
                correctAnswerClone.some((letter) => letter.letter === answer[i])
            ) {
                console.log(`Case: wrongPos letter: ${answer[i]}, index: ${i}`);
                this.rows[this.attempt].letters[i].state = LetterState.WrongPosition;
                correctAnswerClone = correctAnswerClone.filter(pair => pair.position !== i);
                console.log(correctAnswerClone);
                console.log(" ");
            }
            else {
                console.log(`Case: wrong letter: ${answer[i]}, index: ${i}`);
                this.rows[this.attempt].letters[i].state = LetterState.Wrong;
                console.log(correctAnswerClone);
                console.log(" ");
            }
        }
        this.prepareNextRow();
    }

    private prepareNextRow(): void {
        this.attempt++;
        this.position = 0;
        this.currentWord = "";
    }

    private cloneAnswerLetters(answerLetters: LetterPositionPair[]): LetterPositionPair[] {
        let result: LetterPositionPair[] = [];
        answerLetters.forEach(pair => result.push(pair));

        return result;
    }
}
