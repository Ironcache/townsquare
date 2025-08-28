const GoodsCard = require('../../goodscard.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class Guandao extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () => this.location === 'play area' && this.parent && this.parent.hasKeyword('kung fu'),
            effect: ability.effects.setAsStud()
        });
        this.action({
            title: 'Guandao',
            playType: 'shootout',
            cost: ability.costs.bootSelf(),
            message: context => this.game.addMessage('{0} uses {1} to give {2} +1 bullet.', context.player, this, this.parent),
            handler: context => {
                this.applyAbilityEffect(context.ability, ability => ({
                    match: this.parent,
                    effect: ability.effects.modifyBullets(1)
                }));
            }
        })
    }
}

Guandao.code = '26038';

module.exports = Guandao;
