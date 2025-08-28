const ActionCard = require('../../actioncard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class IllCoverYerBacks extends ActionCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'I\'ll Cover Yer Backs!',
            playType: 'resolution',
            cost: ability.costs.boot({
                type: 'dude',
                location: 'play area',
                controller: 'current',
                condition: card => card.isParticipating()
            }),
            handler: context => {
                this.game.promptForSelect(context.player, {
                    activePromptTitle: 'Select dudes to send home booted.',
                    waitingPromptTitle: 'Waiting for opponent to select dudes to send home booted.',
                    cardCondition: card => card.isParticipating() &&
                        card.controller === context.costs.boot.controller &&
                        card !== context.costs.boot,
                    controller: 'current',
                    cardType: 'dude',
                    multiSelect: true,
                    numCards: 2,
                    onSelect: (player, coveredDudes) => {
                        let action = GameActions.simultaneously(
                            coveredDudes.map(card => GameActions.sendHome({ card: card, options: { needToBoot: true } }))
                        )
                        this.game.resolveGameAction(action, context).thenExecute(() => {
                            if (coveredDudes.filter(card => card.getGrit(context) < context.costs.boot.getGrit(context)).length > 0) {
                                this.game.promptForSelect(context.player, {
                                    activePromptTitle: 'Select a dude to unboot.',
                                    waitingPromptTitle: 'Waiting for opponent to unboot a dude.',
                                    cardCondition: card => coveredDudes.includes(card) &&
                                        card.getGrit(context) < context.costs.boot.getGrit(context),
                                    cardType: 'dude',
                                    onSelect: (player, unbootDude) => {
                                        this.game.resolveGameAction(GameActions.unbootCard({ card: unbootDude }), context);
                                        this.game.addMessage('{0} uses {1}, booting {2} to send {3} home booted and then unboot {4}.',
                                            player, this, context.costs.boot, coveredDudes, unbootDude);
                                        return true;
                                    }
                                });
                            } else {
                                this.game.addMessage('{0} uses {1}, booting {2} to send {3} home booted.',
                                    player, this, context.costs.boot, coveredDudes);
                            }
                        });
                        return true;
                    }
                });
            }
        });
    }
}

IllCoverYerBacks.code = '26055';

module.exports = IllCoverYerBacks;
