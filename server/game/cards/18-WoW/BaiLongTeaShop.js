const DeedCard = require('../../deedcard.js');
const GameActions = require('../../GameActions/index.js');

class BaiLongTeaShop extends DeedCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Bai Long Tea Shop',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Choose an adjacent dude with zero influence to move here.',
                cardCondition: {
                    location: 'play area',
                    controller: 'any',
                    condition: card => card.influence === 0 && this.isAdjacent(card.gamelocation)
                },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1}, moving {2} to it.', context.player, this, context.target),
            handler: context => {
                this.game.resolveGameAction(GameActions.moveDude({ card: context.target, targetUuid: this.gamelocation }), context);
            }
        });
    }
}

BaiLongTeaShop.code = '26031';

module.exports = BaiLongTeaShop