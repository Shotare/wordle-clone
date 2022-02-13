import { Component, Input, OnInit } from "@angular/core";
import { LettersRow } from "./letters-row";

@Component({
    selector: "game-row",
    templateUrl: "./game-row.component.html",
    styleUrls: ["./game-row.component.sass"],
})
export class GameRowComponent implements OnInit {
    @Input() letters: LettersRow = new LettersRow();

    constructor() {}

    ngOnInit(): void {}
}
