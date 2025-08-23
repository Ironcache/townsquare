const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class BlindMary extends DudeCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.hasAttachmentWithKeywords(['gadget','sidekick']),
            match: this,
            effect: ability.effects.setAsStud()
        });
        this.action({
            title: 'Blind Mary',
            playType: 'shootout',
            target: {
                activePromptTitle: 'Select a gadget to boot.',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    condition: card => card.parent === this && card.hasKeyword('gadget')
                },
                cardType: 'goods'
            },
            message: context =>
                this.game.addMessage('{0} uses {1}, booting {2} to gain +1 bullet.', context.player, this, context.target),
            handler: context => {
                this.game.resolveGameAction(GameActions.bootCard({ card: context.target }), context).thenExecute(() => {
                    this.applyAbilityEffect(context.ability, ability => ({
                        match: this,
                        effect: ability.effects.modifyBullets(1)
                    }));
                });
            }
        })
    }
}

BlindMary.code = '26026';

module.exports = BlindMary