const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class RafiHamid2 extends DudeCard {
    setupCardAbilities() {
        this.action({
            title: 'Noon: Rafi Hamid (Exp. 1)',
            playType: 'noon',
            target: {
                activePromptTitle: 'Select a Government location to move to.',
                location: 'play area',
                cardCondition: { condition: card => card.hasKeyword('government') },
                cardType: ['deed', 'outfit']
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
        this.reaction({
            title: 'React: Rafi Hamid (Exp. 1)',
            when: {
                onCardAced: event => this.isParticipating() && !this.controller.equals(event.card.controller) &&
                    event.card.getType() === 'dude' && event.fromPosse
            },
            handler: context => {
                this.modifyBullets(1)
                this.game.addMessage('{0} gains 1 bullet on {1} from an opposing dude being aced.', context.player, this);
            }
        });
    }
}

RafiHamid2.code = '26017';

module.exports = RafiHamid2;