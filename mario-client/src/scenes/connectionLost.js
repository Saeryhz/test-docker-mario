export default function error() {
    scene('connectionLost', (args) => {
        debug.error(`Tentative de reconnexion au serveur (${args.attempt})`);

        add([
            text(`Connexion perdue\n\nTentative de reconnexion au serveur (${args.attempt})`, { size: 24 }),
            origin('center'),
            pos(width() / 2, height() / 2)
        ])
    })
}