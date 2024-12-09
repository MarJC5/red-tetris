import { Player } from './Player';
import { Piece } from './Piece';

class Game {
    private id: string;
    private players: Map<string, Player>;
    private pieceQueue: Piece[];
    private isActive: boolean;
    private leader: string;

    constructor(id: string) {
        this.id = id;
        this.players = new Map();
        this.pieceQueue = [];
        this.isActive = false;
        this.leader = '';
    }

    getPlayers(): any {
        throw new Error('Method not implemented.');
    }

    addPlayer(id: string, name: string) {
        // Add player logic
    }

    start() {
        // Start game logic
    }
}

export { Game };