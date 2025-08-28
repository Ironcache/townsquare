const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class TheGraveGunslinger extends DudeCard {
    setupCardAbilities(ability) {
        this.playAction({
            title: 'Shootout: The Grave Gunslinger',
            playType: 'shootout',
            cost: ability.costs.payReduceableGRCost(),
            message: context => this.game.addMessage('{0} plays {1} into their posse, booted.', context.player, this),
            handler: context => {
                this.game.resolveGameAction(GameActions.putIntoPlay({ 
                    card: this, 
                    player: context.player, 
                    params: { 
                        playingType: 'ability',
                        context: context
                    }
                }), context)
                .thenExecute(() => 
                    this.game.resolveGameAction(GameActions.joinPosse({ card: this }), context)
                )
                .thenExecute(() => 
                    this.game.resolveGameAction(GameActions.bootCard({ card: this }), context)
                );
            }
        });
        this.action({
            title: 'Resolution: The Grave Gunslinger',
            playType: 'resolution',
            handler: context => {
                context.player.moveCardWithContext(this, 'draw hand', context);
                this.abilityContext = context;
                this.game.promptForValue(context.player, `Set value of ${this.title} to`, 'chooseValue', this, this);
            }
        });
    }
    
    chooseValue(player, arg) {
        let context = this.abilityContext;
        this.untilEndOfShootoutRound(context.ability, ability => ({
            match: this,
            effect: ability.effects.setValue(arg, this.uuid)
        }), 'draw hand');
        this.game.promptForSuit(player, `Set suit of ${this.title} to`, 'chooseSuit', this, this);
        return true;
    }

    chooseSuit(player, arg) {
        let context = this.abilityContext;
        this.untilEndOfShootoutRound(context.ability, ability => ({
            match: this,
            effect: ability.effects.setSuit(arg, this.uuid)
        }), 'draw hand');
        this.game.promptForSelect(player, {
            activePromptTitle: 'Select a card to discard',
            cardCondition: { location: 'draw hand', controller: 'current' },
            onSelect: (player, card) => {
                this.game.resolveGameAction(GameActions.discardCard({ card }), context).thenExecute(() => {
                    this.game.addMessage('{0} uses {1} to put him into their draw hand, set his value to {2} and suit to {3} and discards {4}', 
                        player, this, this.value, this.suit, card);
                    if(card !== this) {
                        player.determineHandResult('\'s hand has been changed to');
                    }
                });
                return true;
            },
            onCancel: player => {
                if(player.drawHand.length > 5) {
                    return false;
                }
                return true;
            },
            context,
            source: this
        });
        return true;
    }    
}

TheGraveGunslinger.code = '26010';

module.exports = TheGraveGunslinger;