const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class StandTogether extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Stand Together',
            playType: 'shootout',
            target: {
                activePromptTitle: 'Choose your dude.',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    condition: card => card.isParticipating() && !card.booted
                },
                cardType: 'dude'
            },
            handler: context => {
                this.game.promptForSelect(context.player, {
                    activePromptTitle: 'Select ' + context.target.influence + ' dudes to unboot.',
                    waitingPromptTitle: 'Waiting for opponent to select dudes to unboot.',
                    cardCondition: card => card.isParticipating() && card.booted && card.controller === context.target.controller,
                    cardType: 'dude',
                    multiSelect: true,
                    numCards: context.target.influence,
                    onSelect: (p, cards) => {
                        let action = GameActions.simultaneously(
                            cards.map(card => GameActions.unbootCard({ card: card }))
                        );
                        this.game.resolveGameAction(action, context).thenExecute(() => {
                            this.game.addMessage('{0} uses {1} to unboot {2} because of {3}.', context.player, this, cards, context.target);
                        });
                        return true;
                    }
                });
            }
        })
    }
}

StandTogether.code = '26060';

module.exports = StandTogether;
