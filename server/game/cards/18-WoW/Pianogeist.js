const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class Pianogeist extends DudeCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isInOpponentsHome(),
            match: this,
            effect: ability.effects.modifyUpkeep(-1)
        });
        this.action({
            title: 'Pianogeist',
            playType: 'noon',
            condition: () => this.controller.getOpponent().ghostrock > this.controller.ghostrock,
            message: context => 
                this.game.addMessage('{0} uses {1} to move to {2}.', 
                    context.player, this, context.player.getOpponent().outfit),
            handler: context => {
                this.abilityContext = context;
                this.game.resolveGameAction(
                    GameActions.moveDude({
                        card: this,
                        targetUuid: this.controller.getOpponent().outfit.uuid
                    }), context);
                context.ability.selectAnotherTarget(context.player, context, {
                    activePromptTitle: 'Select a dude to boot.',
                    waitingPromptTitle: 'Waiting for opponent to select dude...',
                    cardCondition: card => card.gamelocation === this.gamelocation,
                    cardType: 'dude',
                    onSelect: (player, card) => {
                        this.game.resolveGameAction(GameActions.bootCard({ card }), context).thenExecute(() => {
                            this.game.addMessage('{0} uses {1} to boot {2}.', player, this, card);
                        });
                        return true;
                    }
                });
            }
        });
    }
}

Pianogeist.code = '26005';

module.exports = Pianogeist;
