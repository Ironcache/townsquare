const ActionCard = require('../../actioncard.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class AgainstTheOdds extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Against The Odds',
            playType: 'shootout',
            handler: context => {
                const effectHandler = () => {
                    this.lastingEffect(context.ability, ability => ({
                        until: {
                            onPlayWindowClosed: event => event.playWindow.name === 'shootout resolution',
                            onShootoutRoundFinished: () => true
                        },
                        condition: () => this.game.shootout && this.hasFewerDudes(),
                        match: this.controller,
                        effect: ability.effects.modifyHandRankMod(1)
                    }));
                };
                const messageHandler = () => {
                    if(this.hasFewerDudes()) {
                        if(context.player.modifyRank(1, context)) {
                            this.game.addMessage('{0}\'s hand rank is increased by 1 thanks to {1} since their posse has fewer dudes.', 
                                context.player, this);
                        }
                    }
                };
                this.game.onceConditional('onPlayWindowOpened', { condition: event => event.playWindow.name === 'shootout resolution' }, effectHandler);
                this.game.onceConditional('onPlayWindowClosed', { condition: event => event.playWindow.name === 'shootout resolution' }, messageHandler);                
                this.game.once('onShootoutPhaseFinished', () => {
                    this.game.removeListener('onPlayWindowOpened', effectHandler);
                    this.game.removeListener('onPlayWindowOpened', messageHandler);
                });
                this.game.addMessage('{0} uses {1} to get +1 hand rank if they have fewer dudes on reveal.', context.player, this);
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
