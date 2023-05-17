export default function patrol(distance = 100, speed = 50, dir = 1) {
    return {
        require: ['pos', 'area'],
        startingPos: vec2(0, 0),
        add() {
            this.startingPos = this.pos;
            this.on('collide', (obj, side) => {
                if (side === 'left' || side === 'right') {
                    dir = -dir;
                }
            });
        },
        update() {
            if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
                dir = -dir;
            }
            this.move(speed * dir, 0);
        },
    };
}