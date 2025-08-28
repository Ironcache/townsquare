const GoodsCard = require('../../goodscard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class DinglersDirigible extends GoodsCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Dingler\'s Dirigible',
            playType: 'noon',
            cost: ability.costs.bootSelf(),
            target: {
                activePromptTitle: 'Choose location to move to.',
                cardCondition: { 
                    location: 'play area', 
                    condition: card => card.gamelocation !== this.gamelocation
                },
                cardType: 'location'
            },
            handler: context => {
                this.game.promptForSelect(context.player, {
                    activePromptTitle: 'Select dudes at your location.',
                    waitingPromptTitle: 'Waiting for opponent to select dudes to move.',
                    multiSelect: true,
                    numCards: 0,
                    cardCondition: card => card.controller === context.player && card.gamelocation === this.gamelocation,
                    cardType: 'dude',
                    onSelect: (player, cards) => {
                        let moveAction = GameActions.simultaneously(
                            cards.map(card => GameActions.moveDude({ 
                                card: card, 
                                targetUuid: context.target.gamelocation
                            }))
                        );
                        this.game.resolveGameAction(moveAction).thenExecute(() => {
                            this.game.addMessage('{0} uses {1} to move {2} to {3}.', player, this, cards, context.target);
                            context.player.pull((_c, _v, pullSuit) => {
                                if (pullSuit === 'Clubs') {
                                    let bootAction = GameActions.simultaneously(
                                        cards.map(card => GameActions.bootCard({ card: card }))
                                    );
                                    this.game.resolveGameAction(bootAction).thenExecute(() => {
                                        this.game.addMessage('{0} pulled a club and boots all the dudes.', this);
                                    });
                                }
                            }, context);
                        });
                        return true;
                    }
                });
            }
        });
    }
}

DinglersDirigible.code = '26044';

module.exports = DinglersDirigible;
