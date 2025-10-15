const MenuPrompt = require('./menuprompt.js');

class DeedStreetSidePrompt extends MenuPrompt {
    constructor(game, player, properties) {
        super(game, player, properties.deedCard, properties.playingType);
        this.player = player;
        this.deedCard = properties.deedCard;
        this.playingType = properties.playingType;
        this.originalLocation = properties.originalLocation;
        this.onPlay = properties.onPlay || (() => true);
        this.onCancel = properties.onCancel || (() => true);
    }

    continue() {
        if(this.player === this.game.automaton) {
            let leftNum = 0 - this.player.leftmostLocation().order;
            let rightNum = this.player.rightmostLocation().order;
            if(rightNum < leftNum) {
                this.rightSide();
            } else {
                this.leftSide();
            }
        } else {
            let leftButton = { text: 'Left', method: 'leftSide', arg: ''};
            let rightButton = { text: 'Right', method: 'rightSide', arg: ''};
            let cancelButton = { text: 'Cancel', method: 'cancel', arg: ''};
        
            this.game.promptWithMenu(this.player, this, {
                activePrompt: {
                    menuTitle: 'Place ' + this.context.title + ' on Left/Right?',
                    buttons: [leftButton, rightButton, cancelButton]
                },
                source: this.context
            });
        }
    }

    leftSide() {
        this.player.addDeedToLeft(this.context);
        this.onPlay();
        return true;
    }

    rightSide() {
        this.player.addDeedToRight(this.context);
        this.onPlay();
        return true;
    }

    cancel() {
        this.player.moveCard(this.deedCard, this.originalLocation);
        this.onCancel();
        return true;
    }
}

module.exports = DeedStreetSidePrompt;
