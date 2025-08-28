const SpellCard = require('../../spellcard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class StrengthOfFellowship extends SpellCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.spellAction({
            title: 'Strength of Fellowship',
            playType: 'shootout',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Choose dudes to make studs.',
                cardCondition: { 
                    location: 'play area', 
                    controller: 'current', 
                    condition: card => card.isParticipating() && !card.booted
                },
                cardType: 'dude',
                multiSelect: true,
                numCards: 0
            },
            difficulty: 8,
            onSuccess: context => {
                const studDudes = []
                let action = GameActions.simultaneously(
                    context.target.map(card => GameActions.bootCard({ card: card }).thenExecute(() => { studDudes.push(card);}))
                );
                this.game.resolveGameAction(action, context).thenExecute(() => {
                    this.applyAbilityEffect(context.ability, ability => ({
                        match: studDudes,
                        effect: ability.effects.setAsStud()
                    }));
                    this.game.addMessage('{0} uses {1} to make {2} a stud(s).', context.player, this, studDudes);
                });
            }
        })
    }
}

StrengthOfFellowship.code = '26048';

module.exports = StrengthOfFellowship;
