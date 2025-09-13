const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class OnTheLam extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'On The Lam',
            playType: ['noon'],
            target: {
                activePromptTitle: 'Choose a dude.',
                cardCondition: {
                    location: 'play area',
                    controller: 'any',
                },
                cardType: 'dude'
            },
            handler: context => {
                this.game.resolveGameAction(GameActions.addBounty({ card: context.target }), context);
                this.game.promptForLocation(context.target.controller, {
                    activePromptTitle: 'Choose a location to move ' + context.target.title + ' to from On The Lam.',
                    waitingPromptTitle: 'Waiting for opponent to choose destination.',
                    cardCondition: {
                        location: 'play area'
                    },
                    onSelect: (player, location) => {
                        this.game.resolveGameAction(GameActions.moveDude({ 
                            card: context.target, 
                            targetUuid: location.uuid
                        }), context);   
                        this.game.addMessage('{0} uses {1} to bounty {2}, and then {3} moves {2} to {4}', 
                            this.controller, this, context.target, context.target.controller, location);                                 
                        return true;
                    }
                });
            }
        });
    }
}

OnTheLam.code = '26053';

module.exports = OnTheLam;
