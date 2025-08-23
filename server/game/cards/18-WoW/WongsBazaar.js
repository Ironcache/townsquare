const DeedCard = require('../../deedcard.js');

class WongsBazaar extends DeedCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Wong\'s Bazaar',
            playType: 'cheatin resolution',
            cost: ability.costs.bootSelf(),
            handler: context => {
                this.abilityContext = context;
                if (this.controller.getOpponent().ghostrock > 0 ) {
                    this.game.promptWithMenu(this.controller, this, {
                        activePrompt: {
                            menuTitle: 'Choose cheatin\' punishment',
                            buttons: [
                                { text: 'Steal 1 GR', method: 'takeGR' },
                                { text: 'Draw a card', method: 'drawCard' }
                            ]
                        },
                        source: this
                    });
                } else {
                    this.drawCard();
                }            
            }
        });
    }

    takeGR() {
        this.controller.modifyGhostRock(1);
        this.controller.getOpponent().modifyGhostRock(-1);
        this.game.addMessage('{0} uses {1} to steal 1 GR from their opponent.', this.controller, this);
        return true;
    }

    drawCard() {
        this.abilityContext.player.drawCardsToHand(1, this.abilityContext);
        this.game.addMessage('{0} uses {1} to draw a card.', this.controller, this);        
        return true;
    }    
}

WongsBazaar.code = '26036';

module.exports = WongsBazaar