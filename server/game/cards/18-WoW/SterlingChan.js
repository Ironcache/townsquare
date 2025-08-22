const DudeCard = require('../../dudecard.js');

class SterlingChan extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Sterling Chan',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Choose your dude',
                cardCondition: { 
                    location: 'play area', 
                    controller: this.controller.getOpponent(), 
                    condition: card => card.gamelocation == this.gamelocation                 
                },
                cardType: ['dude']
            },
            message: context => 
                this.game.addMessage('{0} uses {1}, preventing {2} from unbooting if at his location at Nightfall.', 
                    context.player, this, context.target),
            handler: context => {
                this.game.once('onSundownAfterVictoryCheck', () => {
                    if (context.target.gamelocation === this.gamelocation && context.target.booted) {
                        this.game.addMessage('{0} prevented {1} from unbooting.', this, context.target);
                        this.untilEndOfRound(context.ability, ability => ({
                            match: context.target,
                            effect: ability.effects.doesNotUnbootAtNightfall()
                        }));
                    }
                });
            }
        });
    }
}

SterlingChan.code = '26006';

module.exports = SterlingChan;
