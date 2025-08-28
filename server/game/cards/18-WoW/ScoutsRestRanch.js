const DeedCard = require('../../deedcard.js');
const GameActions = require('../../GameActions/index.js');

class ScoutsRestRanch extends DeedCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Scouts Rest Ranch',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Choose your dude with a horse to move home.',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    condition: card => card.hasAttachmentWithKeywords('horse')
                },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1}, moving {2} home.', context.player, this, context.target),
            handler: context => {
                this.game.resolveGameAction(GameActions.moveDude({ card: context.target, targetUuid: this.controller.outfit.uuid }), context);
            }
        });
    }
}

ScoutsRestRanch.code = '26033';

module.exports = ScoutsRestRanch