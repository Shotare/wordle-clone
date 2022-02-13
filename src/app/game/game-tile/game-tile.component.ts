import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "game-tile",
    templateUrl: "./game-tile.component.html",
    styleUrls: ["./game-tile.component.sass"],
})
export class GameTileComponent implements OnInit {
    @Input() letter: string = "";

    constructor() {}

    ngOnInit(): void {}
}
