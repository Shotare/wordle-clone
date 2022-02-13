import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameTileComponent } from "./game/game-tile/game-tile.component";
import { GameRowComponent } from './game/game-row/game-row.component';
import { GameBoardComponent } from './game/game-board/game-board.component';

@NgModule({
    declarations: [AppComponent, GameTileComponent, GameRowComponent, GameBoardComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
