const DeedCard = require('../../deedcard.js');
const GameActions = require('../../GameActions/index.js');

class LangrisheTheater extends DeedCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            condition: () => true,
            match: card => card.getType() === 'dude' && card.hasKeyword('abomination') && this.equals(card.locationCard),
            effect: ability.effects.modifyBullets(-1)
        });
    }
}

LangrisheTheater.code = '26034';

module.exports = LangrisheTheater