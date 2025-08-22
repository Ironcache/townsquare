const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class FireDancer extends DudeCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Fire-Dancer',
            when: {
                onPullSuccess: event =>
                    event.pullingDude && event.source &&
                    event.pullingDude === this &&
                    event.source.hasKeyword('totem')
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.unbootCard({ card: this }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to unboot.', context.player, this, this);
                });
            }
        });
    }
}

FireDancer.code = '26014';

module.exports = FireDancer;