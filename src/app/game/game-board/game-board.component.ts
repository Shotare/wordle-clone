import { Component, OnInit } from "@angular/core";
import { LettersRow } from "../game-row/letters-row";

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

    constructor() {}

    ngOnInit(): void {}

    onKeyDownEvent(event: KeyboardEvent) {
        if (this.position < 5) {
            this.rows[this.attempt].insertLetter(event.key, this.position);
            this.position++;
        }
    }
}
