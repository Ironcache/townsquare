const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class JettCanCega extends DudeCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Jett Can Cega',
            when: {
                onDudeLeftPosse: event => event.card === this
            },
            target: {
                activePromptTitle: 'Choose a card to boot in the opposing posse.',
                cardCondition: { 
                    location: 'play area',
                    condition: card => card.isInOpposingPosse() && !card.booted
                }
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.bootCard({ card: context.target }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to boot {2} as he leaves the posse.', context.player, this, context.target);
                })
            }
        });
    }
}

JettCanCega.code = '26013';

module.exports = JettCanCega;