import { LetterState } from "./letter-state";

export class Letter {
    value: string = "";
    state: LetterState = LetterState.Wrong;

    constructor() {}
}
