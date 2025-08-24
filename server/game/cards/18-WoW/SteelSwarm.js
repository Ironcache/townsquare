const GoodsCard = require('../../goodscard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class SteelSwarm extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Steel Swarm',
            playType: 'cheatin resolution',
            cost: ability.costs.bootSelf(),
            target: {
                choosingPlayer: 'opponent',
                activePromptTitle: 'Select a dude to boot.',
                waitingPromptTitle: 'Waiting for opponent to select dude',
                cardCondition: {
                    location: 'play area',
                    condition: card => card.controller === this.controller.getOpponent() && !this.game.shootout || card.isParticipating()
                },
                cardType: 'dude'
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.bootCard({ card: context.target }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to boot {2}.', context.player, this, context.target); 
                });
                if (this.game.shootout) {
                    this.game.resolveGameAction(GameActions.decreaseCasualties({ player: this.controller, amount: 2 }), context)
                    .thenExecute(() => {
                        this.game.addMessage('{0} also reduces casualties by 2.', this);
                    }).thenExecute(() => {
                        context.ability.selectAnotherTarget(this.controller, context, {
                            activePromptTitle: 'Select another dude to boot in the shootout.',
                            waitingPromptTitle: 'Waiting for opponent to select dude.',
                            cardCondition: card => card.isParticipating() && card.controller !== context.player,
                            cardType: 'dude',
                            onSelect: (_, card) => {
                                this.game.resolveGameAction(GameActions.bootCard({ card }), context).thenExecute(() => {
                                    this.game.addMessage('{0} also boots {1}.', this, card);
                                });
                                return true;
                            },
                        });
                    });
                }
            }
        });
    }
}

SteelSwarm.code = '26039';

module.exports = SteelSwarm;
