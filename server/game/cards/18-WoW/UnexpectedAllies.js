const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
const StandardActions = require('../../PlayActions/StandardActions.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class UnexpectedAllies extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Unexpected Allies',
            playType: 'cheatin resolution',
            target: {
                activePromptTitle: 'Choose a dude to target with Unexpected Allies.',
                cardCondition: {
                    location: 'discard pile',
                    controller: 'current'
                },
                cardType: 'dude'
            },
            handler: context => {
                if (this.game.shootout) {
                    this.game.promptForYesNo(this.controller, {
                        title: 'Do you want to have the dude join your posse?',
                        onYes: player => {
                            this.game.resolveStandardAbility(StandardActions.putIntoPlay({
                                playType: 'ability',
                                abilitySourceType: 'card'
                            }, () => {
                                this.game.resolveGameAction(GameActions.joinPosse({ card: context.target }), context);
                            }), player, context.target);
                            if(context.player.modifyRank(2, context)) {
                                this.game.addMessage('{0} uses {1} to have {2} join the posse and increases their hand rank by 2.',
                                    player, this, context.target);
                            }
                            else {
                                this.game.addMessage('{0} uses {1} to have {2} join the posse, but their hand rank could not be modified.',
                                    player, this, context.target);
                            }
                        },
                        onNo: player => {
                            this.game.resolveGameAction(GameActions.addToHand({ card: context.target }), context);
                            this.game.addMessage('{0} uses {1} to put {2} into their hand.', player, this, context.target);
                        }
                    });
                } else {
                    this.game.resolveGameAction(GameActions.addToHand({ card: context.target }), context);
                    this.game.addMessage('{0} uses {1} to put {2} into their hand.', context.player, this, context.target);
                }
            }
        })
    }
}

UnexpectedAllies.code = '26056';

module.exports = UnexpectedAllies;
