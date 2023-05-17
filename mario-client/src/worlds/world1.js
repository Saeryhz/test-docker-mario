import * as logic from '../logic/index.js';

const LEVELS = [
    [
        '                                                                                                ',
        '                                                                                                ',
        '                                                                                                ',
        '                                                                                                ',
        '                                                                                                ',
        '                                                                                                ',
        '                                                                                                ',
        '      -?-b-                                                                                     ',
        '                                                    ?        ?                                  ',
        '                                                                                                ',
        '                                      _                 ?                                       ',
        '                                 _    |                                                         ',
        '                           _     |    |                _                                        ',
        '       E                   |     |    |   E   E        |                            H           ',
        '================     ===========================================================================',
        '================     ===========================================================================',
    ],
    [
        '                                                                                             ',
        '                                                                                             ',
        '                                                                                             ',
        '                                       ?                                                     ',
        '                                                                                             ',
        '                                   -?-                                                       ',
        '                                                                                             ',
        '      -?-b-                  -?-                                                             ',
        '                                                                                             ',
        '                                                                                             ',
        '                                                                                             ',
        '                                                                                             ',
        '       _                                            _                                        ',
        '       |                                            |          E    E            H           ',
        '================     ========================================================================',
        '================     ========================================================================',
    ]
];

const CONFIG = {
    width: 16,
    height: 16,
    '=': () => [
        sprite('ground'),
        area(),
        solid(),
        origin('bot'),
        'ground'
    ],
    '-': () => [
        sprite('brick'),
        area(),
        solid(),
        origin('bot'),
        'brick'
    ],
    'H': () => [
        sprite('castle'),
        area({ width: 1, height: 240 }),
        origin('bot'),
        'castle'
    ],
    '?': () => [
        sprite('questionBox'),
        area(),
        solid(),
        origin('bot'),
        'questionBox',
        'coinBox'
    ],
    'b': () => [
        sprite('questionBox'),
        area(),
        solid(),
        origin('bot'),
        'questionBox',
        'mushyBox'
    ],
    '!': () => [
        sprite('emptyBox'),
        area(),
        solid(),
        bump(),
        origin('bot'),
        'emptyBox'
    ],
    'c': () => [
        sprite('coin'),
        area(),
        solid(),
        bump(64, 8),
        cleanup(),
        lifespan(0.4, { fade: 0.01 }),
        origin('bot'),
        'coin'
    ],
    'M': () => [
        sprite('bigMushy'),
        area(),
        solid(),
        logic.patrol(10000),
        body(),
        cleanup(),
        origin('bot'),
        'bigMushy'
    ],
    '|': () => [
        sprite('pipeBottom'),
        area(),
        solid(),
        origin('bot'),
        'pipe'
    ],
    '_': () => [
        sprite('pipeTop'),
        area(),
        solid(),
        origin('bot'),
        'pipe'
    ],
    'E': () => [
        sprite('enemies', { anim: 'Walking' }),
        area({ width: 16, height: 16 }),
        logic.goomba(),
        logic.patrol(),
        cleanup(),
        body(),
        origin('bot'),
        'goomba'
    ],
};

export default {
    LEVELS,
    CONFIG
}