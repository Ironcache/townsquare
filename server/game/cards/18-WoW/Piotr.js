const DudeCard = require('../../dudecard.js');

class Piotr extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Piotr',
            playType: 'shootout',
            repeatable: true,
            limit: 1,
            cost: ability.costs.discardFromPlay(card => 
                this.equals(card.parent) && card.isMiracle()),
            message: context => 
                this.game.addMessage('{0} uses {1}, discarding {2} to get +1 bullets and becomes a stud.', 
                    context.player, this, context.costs.discardFromPlay),
            handler: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: this,
                    effect: [
                        ability.effects.setAsStud(),
                        ability.effects.modifyBullets(1)
                    ]
                }));
            }
        });
    }
}

Piotr.code = '26004';

module.exports = Piotr;
