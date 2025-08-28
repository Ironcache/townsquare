const DudeCard = require('../../dudecard.js');

class NoahJonahWhateley extends DudeCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.shootout && this.isParticipating() && this.isAtHome(),
            match: card => card.isParticipating() && card.controller === this.controller && card.hasKeyword('huckster'),
            effect: ability.effects.setAsStud()
        });
    }
}

NoahJonahWhateley.code = '26009';

module.exports = NoahJonahWhateley;