const DudeCard = require('../../dudecard.js');

class CalamityJane extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Calamity Jane',
            playType: 'shootout',
            repeatable: true,
            limit: 1,
            cost: ability.costs.discardFromHand(card => card.getType() === 'action'),
            target: {
                activePromptTitle: 'Select a dude who has Jane in their eyes.',
                cardCondition: { 
                    location: 'play area', 
                    participating: true, 
                    controller: 'opponent'
                },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1}, discarding {2} to give {3} -2 bullets.', 
                    context.player, this, context.costs.discardFromPlay, context.target),
            handler: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: context.target,
                    effect: ability.effects.modifyBullets(-2)
                }));
            }
        });
    }
}

CalamityJane.code = '26027';

module.exports = CalamityJane