const ActionCard = require('../../actioncard.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class AgainstTheOdds extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Against The Odds',
            playType: 'shootout',
            handler: context => {
                const handler = () => {
                    if(this.hasFewerDudes()) {
                        if(context.player.modifyRank(1, context)) {
                            this.game.addMessage('{0}\'s hand rank is increased by 1 thanks to {1} since their posse has fewer dudes.', 
                                context.player, this);
                        }
                        else {
                            this.game.addMessage('{0}\'s hand rank could not be increased by {1} due to another effect.', 
                                context.player, this);
                        }
                    }
                    else {
                        this.game.addMessage('{0}\'s hand rank is not changed by {1} since they do not have fewer dudes.', 
                                context.player, this);
                    }
                };
                this.game.onceConditional('onPlayWindowOpened', { condition: event => event.playWindow.name === 'shootout resolution' }, handler);                
                this.game.once('onShootoutPhaseFinished', () => {
                    this.game.removeListener('onPlayWindowOpened', handler);
                });
                this.game.addMessage('{0} uses {1} to get +1 hand rank if they have fewer dudes on draw hand reveal.', context.player, this);
            }
        })
    }

    hasFewerDudes() {
        return this.game.shootout.getPosseByPlayer(this.controller).getDudes().length < 
            this.game.shootout.getPosseByPlayer(this.controller.getOpponent()).getDudes().length
    }
}

AgainstTheOdds.code = '26059';

module.exports = AgainstTheOdds;
