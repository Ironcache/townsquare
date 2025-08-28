const GoodsCard = require('../../goodscard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class LogoMatic extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Log-o-Matic',
            playType: 'shootout',
            condition: () => this.game.shootout.round > 1,
            cost: ability.costs.bootSelf(),
            handler: context => {
                this.game.resolveGameAction(GameActions.increaseCasualties({ player: this.controller.getOpponent(), amount: 1 }), context)
                .thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to increase {2}\'s casualties by 1 this round.',
                        context.player, this, this.controller.getOpponent());
                })
            }
        })
    }
}

LogoMatic.code = '26040';

module.exports = LogoMatic;
