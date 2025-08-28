const SpellCard = require('../../spellcard.js');
/** @typedef {import('../../AbilityDsl.js')} AbilityDsl */

class AloneInTheDark extends SpellCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.spellAction({
            title: 'Alone in the Dark',
            playType: 'shootout',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Select a target.',
                waitingPromptTitle: 'Waiting for opponent to select a dude.',
                cardCondition: {
                    location: 'play area',
                    controller: 'opponent',
                    condition: card => card.isParticipating()
                },
                cardType: 'dude'
            },
            difficulty: context => context.target.getGrit(context),
            onSuccess: context => {
                // TODO: This is a bit of a hack; right now just checking if >1 dude.  Need to check if all dudes were affected and undo.
                if (this.game.shootout.getPosseByPlayer(this.controller.getOpponent()).getDudes().length > 1) {
                    this.applyAbilityEffect(context.ability, ability => ({
                        match: context.target,
                        effect: ability.effects.doesNotProvideBulletRatings()
                    }));  
                    this.lastingEffect(context.ability, ability => ({
                        until: {
                            onShootoutRoundFinished: () => true
                        },
                        match: context.target,
                        effect: ability.effects.cannotBeChosenAsCasualty()
                    }));
                    this.game.addMessage('{0} uses {1}, removing {2}\'s bullet contribution and making them immune to casualties.', 
                        context.player, this, context.target);
                } else {
                    this.game.addMessage('{0} uses {1}, but its effect is cancelled since all opposing dudes are affected.', 
                        context.player, this);
                }
            }
        })
    }
}

AloneInTheDark.code = '26046';

module.exports = AloneInTheDark;
