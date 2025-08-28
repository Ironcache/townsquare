const DudeCard = require('../../dudecard.js');
/** @typedef {import('../../AbilityDsl.js')} AbilityDsl */

class WongFeeLee extends DudeCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.shootout,
            match: this,
            effect: ability.effects.dynamicSkillRating('kung fu', () => this.getDudesInPosse())
        });
    }

    getDudesInPosse() {
        if(!this.game.shootout) {
            return 0;
        }
        const posse = this.game.shootout.getPosseByPlayer(this.controller.getOpponent());

        if(posse) {
            return posse.getDudes().length;
        }
        return 0;
    }
}

WongFeeLee.code = '26002';

module.exports = WongFeeLee;