const GoodsCard = require('../../goodscard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class TheRoyalsHoyle extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'The Royal\'s Hoyle',
            playType: 'cheatin resolution',
            cost: ability.costs.bootSelf(),
            handler: context => {
                this.controller.getOpponent().discardFromHand(1, discarded => {
                    this.game.addMessage('{0} uses {1} to make {2} discard {3}.',
                        this.controller, this, this.controller.getOpponent(), discarded);
                    if (this.game.shootout) {
                        this.game.resolveGameAction(GameActions.decreaseCasualties({ 
                            player: this.controller, 
                            amount: 1
                        }), context).thenExecute(() => {
                            this.game.addMessage('{0} also reduces {1}\'s casualties by 1.', this, this.controller);
                        });
                    }
                    if (this.parent.hasKeyword('huckster')) {
                        this.controller.drawCardsToHand(1, context);
                        this.game.addMessage('{0} also lets {1} draw a card.', this, this.controller);
                    }
                });
            }
        });
    }
}

TheRoyalsHoyle.code = '26043';

module.exports = TheRoyalsHoyle;
