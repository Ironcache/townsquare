const GoodsCard = require('../../goodscard.js');
const PhaseNames = require('../../Constants/PhaseNames.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class NegentropicPylon extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.location === 'play area' && this.gamelocation === this.controller.getOpponent().outfit.uuid,
            match: this,
            effect: ability.effects.modifyControl(1)
        });
        this.traitReaction({
            when: { onPhaseStarted: event => this.location === 'play area' && event.phase === PhaseNames.Sundown },
            handler: context => {
                context.player.pull((_p, _v, suit) => {
                    if (suit === 'Clubs') {
                        context.player.discardCard(this);
                        this.game.addMessage('{0} pulled a club for {1}, discarding it.', context.player, this);
                    }
                });
            }
        });
    }
}

NegentropicPylon.code = '26042';

module.exports = NegentropicPylon;
