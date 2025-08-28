const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class HickoksRevenge extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.persistentEffect({
            location: 'any',
            targetController: 'current',
            condition: () => this.game.shootout && this.controller.getOpponent().getHandRank().rank === 11,
            effect: ability.effects.reduceSelfCost('any', 2)
        });

        this.action({
            title: 'Hickok\'s Revenge',
            playType: 'resolution',
            handler: context => {
                let token = context.player.placeToken('Gunslinger', this.game.shootout.shootoutLocation.uuid);
                this.game.resolveGameAction(GameActions.joinPosse({ card: token, moveToPosse: false }), context);
                this.game.addMessage('{0} uses {1} to call a {2} into the shootout.', context.player, this, token);
                if (this.controller.getOpponent().getHandRank().rank === 11) {
                    this.applyAbilityEffect(context.ability, ability => ({
                        match: token,
                        effect: ability.effects.modifyBullets(2)
                    }))
                    this.game.resolveGameAction(GameActions.decreaseCasualties({ 
                        player: this.controller,
                        amount: 3
                    }), context);
                    this.game.addMessage('{0} also has 2 lower cost, reduces casualties by 3, and gives the {1} +2 bullets.',
                        this, token);
                }
            }
        });
    }
}

HickoksRevenge.code = '26052';

module.exports = HickoksRevenge;
