const ActionCard = require('../../actioncard.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class FacingYerDemons extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Facing Yer Demons',
            playType: 'noon',
            target: {
                activePromptTitle: 'Select a dude with no attachments.',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    condition: card => card.controller === this.controller && card.attachments.length === 0
                },
                cardType: 'dude'
            },
            handler: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: context.target,
                    effect: [
                        ability.effects.modifyBullets(2)
                    ]
                }));
                this.game.addMessage('{0} uses {1} to give {2} +2 bullets.', context.player, this, context.target);
                this.game.addAlert('warning', '{0}\'s effect for callout discard cost is currently unimplemented.', this);
            }
        });
    }
}

FacingYerDemons.code = '26057';

module.exports = FacingYerDemons;
