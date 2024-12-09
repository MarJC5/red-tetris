import { Piece } from './Piece';

class Player {
    private id: string;
    private name: string;
    private board: number[][];
    private score: number;
    private currentPiece: Piece | null;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.board = Array(20).fill(Array(10).fill(0));
        this.score = 0;
        this.currentPiece = null;
    }
}

export { Player };