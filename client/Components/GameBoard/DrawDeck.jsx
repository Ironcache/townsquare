import React from 'react';
import PropTypes from 'prop-types';

import CardPile from './CardPile';
import Droppable from './Droppable';
import CardFilter from './CardFilter';
class DrawDeck extends CardFilter {
    constructor() {
        super();

        this.handleShowDeckClick = this.handleShowDeckClick.bind(this);
        this.handleShuffleClick = this.handleShuffleClick.bind(this);
        this.handlePopupChange = this.handlePopupChange.bind(this);
    }

    handleShowDeckClick() {
        if(this.props.onPopupChange) {
            this.props.onPopupChange({ visible: true });
        }
    }

    handleShuffleClick() {
        if(this.props.onShuffleClick) {
            this.props.onShuffleClick();
        }
    }  

    handlePopupChange(event) {
        if(this.props.onPopupChange && !event.visible) {
            this.props.onPopupChange({ visible: false });
        }
    }

    renderDroppablePile(source, child) {
        return this.props.isMe ? <Droppable onDragDrop={ this.props.onDragDrop } source={ source } playerName={ this.props.playerName }>{ child }</Droppable> : child;
    }

    render() {
        let drawDeckPopupMenu = [];

        if(this.props.isMe) {
            drawDeckPopupMenu.push({ text: 'Close & Shuffle', icon: 'random', handler: this.handleShuffleClick, close: true });
        }
        this.addFilterButtons(drawDeckPopupMenu);

        var drawDeckMenu = [
            { text: 'Show', handler: this.handleShowDeckClick, showPopup: true },
            { text: 'Shuffle', handler: this.handleShuffleClick}
        ];        

        let hasVisibleCards = !!this.props.cards && this.props.cards.some(card => !card.facedown);

        return (<CardPile className='draw'
            cardCount={ this.props.cardCount }
            cards={ this.props.cards }
            filter={ this.state.filter }
            isKeywordFilter={ this.state.isKeywordFilter }
            disablePopup={ !hasVisibleCards && (this.props.spectating || !this.props.isMe) }
            showIfVisible
            handleMenuChange={ this.props.handleMenuChange }
            hiddenTopCard={ !this.props.revealTopCard }
            playerName={ this.props.playerName }
            onCardClick={ this.props.onCardClick }
            onDragDrop={ this.props.onDragDrop }
            onMouseOut={ this.props.onMouseOut }
            onMouseOver={ this.props.onMouseOver }
            onPopupChange={ this.handlePopupChange }
            popupLocation={ this.props.popupLocation }
            popupMenu={ drawDeckPopupMenu }
            menu={ drawDeckMenu }
            size={ this.props.size }
            source='draw deck'
            title='Draw' />);
    }
}

DrawDeck.propTypes = {
    cardCount: PropTypes.number,
    cards: PropTypes.array,
    handleMenuChange: PropTypes.func,
    isMe: PropTypes.bool,
    onCardClick: PropTypes.func,
    onDragDrop: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    onPopupChange: PropTypes.func,
    onShuffleClick: PropTypes.func,
    playerName: PropTypes.string,
    popupLocation: PropTypes.oneOf(['top', 'bottom']),
    revealTopCard: PropTypes.bool,
    showDeck: PropTypes.bool,
    size: PropTypes.string,
    spectating: PropTypes.bool
};

export default DrawDeck;
