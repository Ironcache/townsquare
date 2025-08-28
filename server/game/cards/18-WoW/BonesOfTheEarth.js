const SpellCard = require('../../spellcard.js');
/** @typedef {import('../../AbilityDsl.js')} AbilityDsl */

class BonesOfTheEarth extends SpellCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.traitReaction({
            title: 'Trait: Bones of the Earth',
            triggerBefore: true,
            when: {
                onDudeSentHome: event => this.game.shootout && event.card.isParticipating() && event.card.gamelocation === this.gamelocation
            },
            handler: context => {
                context.replaceHandler(event => {
                    this.game.addMessage('{0} prevents {1} from being sent home from the shootout.', this, event.card);
                });
            }
        });

        this.spellAction({
            title: 'Shootout: Bones of the Earth',
            playType: 'shootout',
            cost: ability.costs.bootSelf(),
            difficulty: 6,
            onSuccess: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    targetController: 'any',
                    match: card => card.isParticipating() && !card.hasKeyword('shaman'),
                    effect: ability.effects.modifyBullets(-1)
                }))
            }
        });
    }
}

BonesOfTheEarth.code = '26050';

module.exports = BonesOfTheEarth;
