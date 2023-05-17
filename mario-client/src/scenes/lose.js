import constants from '../constants/index.js';

export default function loseScene() {
    scene('lose', (args) => {
        add([
            text('Perdu\n\nAppuyez sur ESPACE pour rejouer', { size: 24 }),
            origin('center'),
            pos(width() / 2, height() / 2)
        ])
        add([
            text('Score:' + args.score, { size: 32 }),
            pos(width() / 2, height() / 2 + 80),
            origin('center')
        ]);

        onKeyPress(constants.keyboard.INPUT_JUMP, () => go('game'));
    })
}