function Card ($card) {
    this.$card = $card;
    this.animate = $card.hasClass('animate');
    
    this.url = $card.attr('data-url');
    
    this.$text = $card.find('figcaption > p');
    
    if(this.animate) {
        this.initialText = this.$text.html();
        this.fullText = $card.attr('data-text');
    }

    this._bind();
}

Card.fx = Card.prototype;

Card.fx._bind = function() {
    this.$card.on('mouseenter', $.proxy(this.onHandler, this));
    this.$card.on('mouseleave', $.proxy(this.offHandler, this));
};

Card.fx.onHandler = function () {
    this.$text.text(this.fullText);
    $('<a href="' + this.url + '" class="read-more">Read More &raquo;</a>').insertAfter(this.$text);
};

Card.fx.offHandler = function () {
    this.$card.find('.read-more').remove();
    this.$text.text(this.initialText);
};

Card.createCards = function($context) {
    var $context = $context || $('body'),
        cards = [];
    
    $context.find('.cards').children().each(function(index, elem) {
        cards.push(new Card($(elem)));
    });
    
    return cards;
}