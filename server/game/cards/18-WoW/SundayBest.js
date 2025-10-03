const GoodsCard = require('../../goodscard.js');
const GameActions = require('../../GameActions/index.js');
const PhaseNames = require('../../Constants/PhaseNames.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class SundayBest extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () => this.game.currentPhase === PhaseNames.Production,
            effect: ability.effects.modifyInfluence(3)
        });
        this.reaction({
            title: 'Sunday Best',
            when: { onPhaseStarted: event => event.phase === PhaseNames.Production },
            cost: ability.costs.bootSelf(),
            handler: context => {
                this.game.promptForLocation(context.player, {
                    activePromptTitle: 'Select where this dude should move to.',
                    waitingPromptTitle: 'Waiting for opponent to use Sunday Best.',
                    cardCondition: {
                        location: 'play area',
                        condition: card => card.isAdjacent(this.gamelocation)
                    },
                    cardType: ['location', 'townsquare'],
                    onSelect: (player, location) => {
                        this.game.resolveGameAction(GameActions.moveDude({ 
                            card: this.parent, 
                            targetUuid: location.uuid
                        }), context);   
                        this.game.addMessage('{0} uses {1} to move {2} to {3}.', player, this, this.parent, location);                                 
                        return true;
                    }
                });   
            }
        })
    }
}

SundayBest.code = '26037';

module.exports = SundayBest;