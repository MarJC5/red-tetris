export const EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    ERROR: 'error',

    // Game events
    JOIN_GAME: 'game:join',
    LEAVE_GAME: 'game:leave',
    START_GAME: 'game:start',
    GAME_OVER: 'game:over',

    // Room events
    ROOM_LIST: 'room:list',

    // Player events
    MOVE_PIECE: 'player:move',
    ROTATE_PIECE: 'player:rotate',
    DROP_PIECE: 'player:drop',
    LINES_CLEARED: 'player:lines_cleared',

    // State updates
    BOARD_UPDATE: 'state:board',
    PLAYERS_UPDATE: 'state:players',
    GAME_STATE: 'state:game'
} as const;