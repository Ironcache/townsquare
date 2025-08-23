const DudeCard = require('../../dudecard.js');

class Tsurugi extends DudeCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.hasAttachmentWithKeywords(['melee']),
            match: this,
            effect: ability.effects.modifyBullets(2)
        });
    }
}

Tsurugi.code = '26025';

module.exports = Tsurugi;