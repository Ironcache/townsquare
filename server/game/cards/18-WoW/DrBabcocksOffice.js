const DeedCard = require('../../deedcard.js');
const GameActions = require('../../GameActions/index.js');

class DrBabcocksOffice extends DeedCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Dr. Babcock\'s Office',
            triggerBefore: true,
            when: {
                onCardDiscarded: event => event.card.getType() === 'dude' && 
                    event.originalLocation === 'play area' &&
                    event.card.controller === this.controller &&
                    event.isCasualty
            },
            cost: ability.costs.bootSelf(),
            handler: context => {
                context.replaceHandler(event => {
                    if (context.player.moveCardWithContext(event.card, 'hand', context)) {
                        this.game.addMessage('{0} uses {1}, returning {2} to hand instead of discarding them as a casualty.', context.player, this, context.event.card);
                    } else {
                        this.game.addMessage('{0} uses {1}, but an effect prevented {2} from returning to hand.', context.player, this, context.event.card);
                        saveEventHandler(event);
                    }
                });
            }
        });
    }
}

DrBabcocksOffice.code = '26032';

module.exports = DrBabcocksOffice