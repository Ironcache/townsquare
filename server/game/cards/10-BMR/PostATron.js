const DudeCard = require('../../dudecard.js');

class PostATron extends DudeCard {
    constructor(owner, cardData) {
        super(owner, cardData);
        this.game.onceConditional('onSetupDrawDeckShuffled', { condition: event => event.player === this.owner }, () => {
            if(this.location === 'play area') {
                this.game.promptForSelect(this.owner, {
                    activePromptTitle: 'Select a dude to make Post-A-Tron',
                    waitingPromptTitle: 'Waiting for opponent to select dude to make Post-A-Tron',
                    cardCondition: card => card.location === 'play area' &&
                        card.controller.equals(this.owner) && !card.booted && card.hasKeyword('mad scientist'),
                    cardType: 'dude',
                    onSelect: (player, card) => {
                        player.pullToInvent(card, this, () => true);
                        return true;
                    }
                });
            }
        });
    }
    setupCardAbilities(ability) {
        this.action({
            title: 'POST-A-TRON',
            playType: ['noon'],
            cost: ability.costs.bootSelf(),
            ifCondition: () => this.isInTownSquare(),
            ifFailMessage: context => this.game.addMessage('{0} uses {1} but does not get any GR since {1} is not in Town Square ', context.player, this),
            message: context => this.game.addMessage('{0} uses {1} to gain 3 GR', context.player, this),
            handler: context => {
                context.player.modifyGhostRock(3);
            }
        });
    }
}

PostATron.code = '18018';

module.exports = PostATron;
