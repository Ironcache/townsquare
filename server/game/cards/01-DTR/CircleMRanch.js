const DeedCard = require('../../deedcard.js');

class CircleMRanch extends DeedCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Circle M Ranch',
            playType: ['noon'],
            condition: context => context.player.hand.length <= 3,
            cost: ability.costs.bootSelf(),
            message: context =>
                this.game.addMessage('{0} uses {1} to draw a card', context.player, this),
            handler: context => {
                context.player.drawCardsToHand(1, context);
            }
        });
    }
}

CircleMRanch.code = '01069';

module.exports = CircleMRanch;
