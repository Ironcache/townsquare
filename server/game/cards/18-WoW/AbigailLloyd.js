const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class AbigailLloyd extends DudeCard {
    setupCardAbilities() {
        this.action({
            title: 'Abigail Lloyd',
            playType: 'resolution',
            target: {
                activePromptTitle: 'Select an opposing goods or spell to discard.',
                location: 'play area',
                controller: 'opponent',
                cardCondition: {
                    condition: card => this.controller.isCheatin() && card.isOpposing(this.controller)
                },
                cardType: ['goods', 'spell']
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.discardCard({ card: context.target }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to discard {2} from play.', context.player, this, context.target);
                });
            }
        });
    }
}

AbigailLloyd.code = '26022';

module.exports = AbigailLloyd;