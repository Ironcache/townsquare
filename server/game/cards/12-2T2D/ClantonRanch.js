const DeedCard = require('../../deedcard.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class ClantonRanch extends DeedCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Noon: Clanton Ranch',
            playType: ['noon'],
            condition: () => !this.controller.firstPlayer,
            cost: ability.costs.bootSelf(),
            message: context => this.game.addMessage('{0} uses {1} to gain 1 GR', context.player, this),
            handler: context => {
                context.player.modifyGhostRock(1);
            }
        });
    }
}

ClantonRanch.code = '20032';

module.exports = ClantonRanch;
