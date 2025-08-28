const GoodsCard = require('../../goodscard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class PennyFarthing extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () => this.gamelocation === this.game.townsquare.uuid,
            effect: ability.effects.modifyInfluence(1)
        });
        this.action({
            title: 'Penny Farthing',
            playType: 'noon',
            cost: [
                ability.costs.bootSelf(),
                ability.costs.discardFromHand()
            ],
            handler: context => {
                this.game.promptForLocation(context.player, {
                    activePromptTitle: 'Choose a location to move to.',
                    waitingPromptTitle: 'Waiting for opponent to move.',
                    cardCondition: {
                        location: 'play area',
                        condition: card => card.isAdjacent(this.gamelocation)
                    },
                    cardType: ['location', 'townsquare'],
                    onSelect: (player, location) => {
                        this.game.resolveGameAction(GameActions.moveDude({ 
                            card: this.parent, 
                            targetUuid: location.uuid
                        }), context);   
                        this.game.addMessage('{0} uses {1}, discarding {2} to move {3} to {4}.',
                            player, this, context.costs.discardFromHand, this.parent, location);                                 
                        return true;
                    }
                });
            }
        })
    }
}

PennyFarthing.code = '26041';

module.exports = PennyFarthing;
