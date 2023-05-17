import constants from '../constants/index.js';

export default function player() {
    return {
        playerName: 'Vous',
        score: constants.game.DEFAULT_PLAYER_SCORE,
        require: ['body', 'area', 'sprite'],
        smallAnimation: 'Running',
        bigAnimation: 'RunningBig',
        smallStopFrame: 0,
        bigStopFrame: 8,
        smallJumpFrame: 5,
        bigJumpFrame: 13,
        isBig: false,
        isFrozen: false,
        isAlive: true,
        update() {
            add([text(this.playerName), pos(this.pos.x, this.pos.y - 50), lifespan(0.005), layer('game'), 'ui']);
            if (this.isFrozen) {
                this.standing();
                return;
            }

            if (!this.isGrounded()) {
                this.jumping();
            }
            else {
                if (isKeyDown(constants.keyboard.INPUT_LEFT) || isKeyDown(constants.keyboard.INPUT_RIGHT)) {
                    this.running();
                } else {
                    this.standing();
                }
            }
        },
        bigger() {
            this.isBig = true;
            this.area.width = 24;
            this.area.height = 32;
        },
        smaller() {
            this.isBig = false;
            this.area.width = 16;
            this.area.height = 16;
        },
        standing() {
            this.stop();
            this.frame = this.isBig ? this.bigStopFrame : this.smallStopFrame;
        },
        jumping() {
            this.stop();
            this.frame = this.isBig ? this.bigJumpFrame : this.smallJumpFrame;
        },
        running() {
            const animation = this.isBig ? this.bigAnimation : this.smallAnimation;
            if (this.curAnim() !== animation) {
                this.play(animation);
            }
        },
        freeze() {
            this.isFrozen = true;
        },
        unFreeze() {
            this.isFrozen = false;
        },
        kill() {
            // addKaboom(this.pos);
            destroy(this);
            go('lose', { score: this.score });
        }
    }
}