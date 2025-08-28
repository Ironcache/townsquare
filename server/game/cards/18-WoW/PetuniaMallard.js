const DudeCard = require('../../dudecard.js');

class PetuniaMallard extends DudeCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.shootout && this.isParticipating(),
            match: this,
            effect: ability.effects.dynamicInfluence(() => this.getHighestPosseBullets())
        });
    }
    getHighestPosseBullets() {
        if(!this.game.shootout) {
            return 0;
        }
        
        const posse = this.game.shootout.getPosseByPlayer(this.controller);

        if(posse) {
            const highest = posse.getDudes().map(dude => dude.bullets).reduce((a, b) => { return Math.max(a, b) });
            return highest;
        }
        return 0;
    }
}

PetuniaMallard.code = '26020';

module.exports = PetuniaMallard;