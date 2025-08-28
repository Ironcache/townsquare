const SpellCard = require('../../spellcard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class ClearOut extends SpellCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.spellAction({
            title: 'Clear Out!',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Select a dude to clear out!',
                waitingPromptTitle: 'Waiting for opponent to select a dude',
                cardCondition: {
                    controller: 'opponent',
                    condition: card => card.gamelocation === this.gamelocation
                },
                cardType: 'dude'
            },
            difficulty: context => context.target.getGrit(context),
            onSuccess: context => {
                this.game.resolveGameAction(GameActions.moveDude(
                    { card: context.target, targetUuid: context.target.controller.outfit.uuid }
                ), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to move {2} home.', context.player, this, context.target)
                     if(context.totalPullValue - 6 >= context.difficulty) {
                        this.game.resolveGameAction(GameActions.bootCard({ card: context.target }), context)
                            .thenExecute(() => this.game.addMessage('{0} also boots {1}.', this, context.target));
                    }
                });
            }
        })
    }
}

ClearOut.code = '26045';

module.exports = ClearOut;
