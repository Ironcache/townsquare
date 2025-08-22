const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class NatWright extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Nat Wright',
            playType: 'noon',
            cost: ability.costs.boot( card => card.hasKeyword('melee') && card.parent === this ),
            target: {
                activePromptTitle: 'Select an opposing wanted dude to call out.',
                location: 'play area',
                controller: 'opponent',
                cardCondition: { condition: card => card.bounty > 0 && card.gamelocation === this.gamelocation },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1}\'s ability to call out {2}', context.player, this, context.target),
            handler: context => {
                this.game.resolveGameAction(GameActions.callOut({ 
                    caller: this,
                    callee: context.target
                }), context);
            }
        });
    }
}

NatWright.code = '26019';

module.exports = NatWright;