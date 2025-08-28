const SpellCard = require('../../spellcard.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class Chastise extends SpellCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.spellAction({
            title: 'Chastise',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Select a dude to chastise.',
                waitingPromptTitle: 'Waiting for opponent to select a dude.',
                cardCondition: {
                    location: 'play area',
                    controller: 'opponent',
                    condition: card => card.isWanted() && card.isNearby(this.parent.gamelocation)
                },
                cardType: 'dude'
            },
            difficulty: 9,
            onSuccess: (context) => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: context.target,
                    effect: [
                        ability.effects.modifyBullets(-1),
                        ability.effects.modifyInfluence(-1)
                    ]
                }));
                this.game.addMessage('{0} uses {1} to chastise {2}, who gets -1 influence and -1 bullets', context.player, this, context.target); 
            }
        })
    }
}

Chastise.code = '26047';

module.exports = Chastise;
