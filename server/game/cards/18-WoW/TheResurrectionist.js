const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class TheResurrectionist extends DudeCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'The Resuurrectionist',
            when: { onCardEntersPlay: event => event.card === this },
            target: {
                activePromptTitle: 'Choose an Abomination in Boot Hill',
                cardCondition: { 
                    location: 'dead pile', 
                    controller: 'current', 
                    condition: card => card.hasKeyword('abomination') 
                },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1} to shuffle {2} from their Boot Hill into their deck.', context.player, this, context.target),
            handler: context => {
                this.game.resolveGameAction(GameActions.shuffleIntoDeck({ cards: context.target }));
            }
        });
    }
}

TheResurrectionist.code = '26012';

module.exports = TheResurrectionist;