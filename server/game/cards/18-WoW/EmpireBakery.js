const DeedCard = require('../../deedcard.js');
const PhaseNames = require('../../Constants/PhaseNames.js');

class EmpireBakery extends DeedCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Empire Bakery',
            when: { onPhaseStarted: event => event.phase === PhaseNames.Upkeep && this.location === 'play area'},
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Choose a dude to reduce their upkeep.',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    condition: card => card.gamelocation === this.gamelocation
                },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1}, reducing the upkeep of {2} by 1.', context.player, this, context.target),
            handler: context => {
                this.untilEndOfPhase(context.ability, ability => ({
                    match: context.target,
                    effect: ability.effects.modifyUpkeep(-1)
                }), PhaseNames.Upkeep);      
            }
        });
    }
}

EmpireBakery.code = '26030';

module.exports = EmpireBakery