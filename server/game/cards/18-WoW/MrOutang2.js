const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class MrOutang2 extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Noon: Mr. Outang (Exp. 1)',
            playType: 'noon',
            ifCondition: () => this.locationCard.hasKeyword('saloon'),
            target: {
                activePromptTitle: 'Select a dude to call out',
                cardCondition: {controller: 'opponent', condition: card => card.canBeCalledOut() && card.gamelocation === this.gamelocation },
                cardType: ['dude'],
                gameAction: 'callout'
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.callOut({ 
                    caller: this,
                    callee: context.target
                }), context);
            }
        });
        this.action({
            title: 'Shootout: Mr. Outang (Exp. 1)',
            playType: 'shootout',
            cost: [
                ability.costs.boot(card => card.controller === this.controller && card.hasKeyword('saloon'))
            ],
            message: context => 
                this.game.addMessage('{0} uses {1}, booting {2} to get +1 bullets.', context.player, this, context.costs.boot),
            handler: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: context.target,
                    effect: ability.effects.modifyBullets(1)
                }));
            }
        });
    }
}

MrOutang2.code = '26003';

module.exports = MrOutang2;