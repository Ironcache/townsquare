const DudeCard = require('../../dudecard.js');

class MahpiyaViolet extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Mahpiya Violet',
            playType: 'shootout',
            cost: ability.costs.discardFromPlay(card => 
                card.location === 'play area' &&
                card.hasKeyword('spirit') &&
                card.parent.owner === this.owner &&
                card.gamelocation === this.gamelocation
            ),
            handler: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: this,
                    effect: [
                        ability.effects.modifyBullets(2),
                        ability.effects.setAsStud()
                    ]
                }));
            }
        });
    }
}

MahpiyaViolet.code = '26015';

module.exports = MahpiyaViolet;