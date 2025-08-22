const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class UncleHowardBearclaw extends DudeCard {
    setupCardAbilities() {
        this.action({
            title: '"Uncle" Howard Bearclaw',
            playType: 'noon',
            target: {
                activePromptTitle: 'Select an Out of Town deed to move to.',
                location: 'play area',
                cardCondition: { condition: card => card.hasKeyword('out of town') },
                cardType: 'deed'
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.moveDude({
                    card: this,
                    targetUuid: context.target.uuid
                }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to move to {2}.', context.player, this, context.target);
                });
            }
        });
    }
}

UncleHowardBearclaw.code = '26016';

module.exports = UncleHowardBearclaw;