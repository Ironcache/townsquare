const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class DrDwightShelton extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Dr. Dwight Shelton',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            ifCondition: () => this.locationCard.hasKeyword('ranch'),
            target: {
                activePromptTitle: 'Choose a horse from your discard pile.',
                choosingPlayer: 'current',
                cardCondition: { 
                    location: 'discard pile', 
                    controller: 'current',
                    condition: card => card.hasKeyword('horse') && !card.hasKeyword('gadget')
                }
            },
            handler: context => {
                context.player.moveCardWithContext(context.target, 'hand', context)
                context.ability.selectAnotherTarget(context.player, context, {
                    activePromptTitle: 'Select a card to discard.',
                    waitingPromptTitle: 'Waiting for opponent select a card to discard.',
                    cardCondition: card => card.location === 'hand',
                    onSelect: (player, card) => {
                        this.game.resolveGameAction(GameActions.discardCard({ card }), context).thenExecute(() => {
                            this.game.addMessage('{0} uses {1}, taking {2} from their discard pile and discarding {3}.',
                                player, this, context.target, card
                            );
                        });
                        return true;
                    }
                });
            }
        });
    }
}

DrDwightShelton.code = '26008';

module.exports = DrDwightShelton;