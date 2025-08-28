const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class Stampede extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.job({
            title: 'STAMPEDE!',
            playType: 'noon',
            target: 'townsquare',
            onSuccess: (job, context) => {
                let action = GameActions.simultaneously(
                    this.game.townsquare.getDudes().map(card => GameActions.bootCard({ card: card }))
                );
                this.game.resolveGameAction(action, context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to boot all dudes in Town Square.', context.player, this);
                    this.game.addAlert('warning', '{0} Town Square adjacency effect is not implemented.', this);
                });
            }
        });
    }
}

Stampede.code = '26058';

module.exports = Stampede;
