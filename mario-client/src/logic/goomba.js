export default function goomba() {
    return {
        require: ['pos', 'area', 'sprite', 'cleanup'],
        isAlive: true,
        squash() {
            this.isAlive = false;
            this.frame = 2;
            this.area.width = 16;
            this.area.height = 8;
            this.stop();
            this.use(lifespan(0.2));
        }
    }
}