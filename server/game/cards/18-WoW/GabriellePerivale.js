const DudeCard = require('../../dudecard.js');

class GabriellePerivale extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Gabrielle Perivale',
            playType: 'shootout',
            target: {
                activePromptTitle: 'Select a Mystical goods to boot.',
                cardCondition: {
                    location: 'play area',
                    condition: card => card.parent === this && card.hasKeyword('mystical') && !card.booted
                },
                cardType: 'goods',
                gameAction: 'boot'
            },
            handler: context => {
                context.ability.selectAnotherTarget(context.player, context, {
                    activePromptTitle: 'Select a dude to affect.',
                    waitingPromptTitle: 'Waiting for opponent select a dude.',
                    cardCondition: card => card.location === 'play area' && card.getType() === 'dude' && card.isOpposing(context.player),
                    onSelect: (_, card) => {
                        this.applyAbilityEffect(context.ability, ability => ({
                            match: card,
                            effect: [
                                ability.effects.modifyBullets(-1 * this.bullets),
                                ability.effects.modifyInfluence(-1 * this.influence)
                            ]
                        }));
                        this.game.addMessage('{0} uses {1} to reduce {2}\'s influence and bullets.', context.player, this, card);
                        return true;
                    }
                });
            }
        });
    }
}

GabriellePerivale.code = '26011';

module.exports = GabriellePerivale;