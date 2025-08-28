const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class MyHorseDontLikeYaEither extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'My Horse Don\'t Like Ya Either',
            playType: 'noon',
            cost: ability.costs.boot({
                type: 'goods',
                location: 'play area',
                controller: 'current',
                condition: card => card.hasKeyword('horse') && this.isCardAtLocationWithOpposingDudes(card)
            }),
            handler: context => {
                this.game.promptForSelect(context.player, {
                    activePromptTitle: 'Select a dude to call out.',
                    waitingPromptTitle: 'Waiting for opponent to select a dude to call out.',
                    cardCondition: card => card.location === 'play area' && card.gamelocation === context.costs.boot.gamelocation &&
                        card.controller === context.player.getOpponent(),
                    controller: 'opponent',
                    cardType: 'dude',
                    onSelect: (player, card) => {
                        this.game.addMessage('{0} uses {1}, booting {2}\'s {3} to call out {4}',
                            player, this, context.costs.boot.parent, context.costs.boot, card);
                        this.game.resolveGameAction(GameActions.callOut({ caller: context.costs.boot.parent, callee: card }), context);
                        return true;
                    }
                });
            }
        });
    }

    isCardAtLocationWithOpposingDudes(card) {
        return this.game.getDudesAtLocation(card.gamelocation, dude => dude.controller === this.controller.getOpponent()).length > 0
    }
}

MyHorseDontLikeYaEither.code = '26054';

module.exports = MyHorseDontLikeYaEither;
