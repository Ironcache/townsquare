const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class IrisJarvis extends DudeCard {
    setupCardAbilities() {
        this.action({
            title: 'Iris Jarvis',
            playType: 'resolution',
            target: {
                activePromptTitle: 'Select an opposing wanted dude to boot.',
                location: 'play area',
                controller: 'opponent',
                cardCondition: { condition: card => this.isParticipating() && !card.booted && card.bounty > 0 },
                cardType: 'dude'
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.bootCard({ card: context.target }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to boot {2}.', context.player, this, context.target);
                });
                if (context.target.controller.isCheatin()) {
                    context.ability.selectAnotherTarget(context.player, context, {
                        activePromptTitle: 'Select an opposing card to boot.',
                        waitingPromptTitle: 'Waiting for opponent to select card.',
                        cardCondition: card => card.isParticipating() && card.location === 'play area',
                        source: this,
                        onSelect: (player, card) => {
                            this.game.resolveGameAction(GameActions.bootCard({ card }), context);
                            this.game.addMessage('{0} uses {1} to boot {2}.', player, this, card);
                            return true;
                        }
                    })
                }
            }
        });
    }
}

IrisJarvis.code = '26018';

module.exports = IrisJarvis;