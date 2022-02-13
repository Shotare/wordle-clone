import { Component, Input, OnInit } from "@angular/core";
import { LetterState } from "./letter-state";

@Component({
    selector: "game-tile",
    templateUrl: "./game-tile.component.html",
    styleUrls: ["./game-tile.component.sass"],
})
export class GameTileComponent implements OnInit {
    @Input() letter: string = "";
    @Input() state: LetterState = LetterState.TBD;

    correctState: LetterState = LetterState.Correct;
    wrongPositionState: LetterState = LetterState.WrongPosition;
    wrongLetterState: LetterState = LetterState.Wrong;

    constructor() {}

    ngOnInit(): void {}
}
