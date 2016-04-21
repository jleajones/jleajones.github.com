/**
 * Created by jleajones on 18/03/2016.
 */
function Slider ($elem, config) {
    this.config = $.extend(Slider.DEFAULTS, config);
    this.index = this.config.index;

    this.$container = $elem;
    /* TODO: after I find the container i need to figure out how many slides we have - mark up based, or class
       CLASS gives more flexibilty with the markup and less JS code to account for li vs div
       */

    this.$next = this.$container.find(this.config.nextSelector);
    this.$prev = this.$container.find(this.config.prevSelector);
    this.$contols = this.$container.find(this.config.controlsSelector);

    //starting slide is being overridden via config
    //ensure its a valid index for our slideshow, if not, just start at 0
    if(this.index !== 0 && this.index > 0 && this.index < this.numSlides) {
        this.goTo(this.index);
    }

    this.bind();

    console.log(this);
}

Slider.DEFAULTS = {
    index: 0,
    containerSelector: '.slider',
    slideSelector: '.slide',
    nextSelector: '.next',
    prevSelector: '.prev',
    controlsSelector: '.controls',
    wrap: false,
    autoPlay: false,
    delay: 2000
};

Slider.fx = Slider.prototype;

Slider.fx.bind = function () {

    //only do if these exist and are hidden by default
    //TODO: add the hidden/visible check
    if(this.$next || this.$prev || this.$contols) {
        //pause autoPlay and show next/prev/controls???
        this.$container.on('mouseover', function(){
            if(this.$next)
               this.$next.show();

            if(this.$prev)
                this.$prev.show();

            if(this.$contols)
                this.$contols.show();

            if(this.to)
                clearInterval(this.to);
        });

        //hide all controls and resume autoPlay is needed
        this.$container.on('mouseleave', function(){
            if(this.$next)
                this.$next.hide();

            if(this.$prev)
                this.$prev.hide();

            if(this.$contols)
                this.$contols.show();

            if(this.config.autoPlay)
                this.autoPlay();
        });
    }

    if(this.$next) {
        this.$next.on('click', $.proxy(this.next, this));
    }

    if(this.$prev) {
        this.$prev.on('click', $.proxy(this.prev, this));
    }

    if(this.config.autoPlay) {
        this.autoPlay();
    }
};

Slider.fx.next = function () {
    if(this.index === this.numSlides - 1) {
        this.index = 0;
    } else {
        this.index++;
    }

};

Slider.fx.prev = function () {
    if(this.index === 0) {
        this.index = this.numSlides - 1;
    } else {
        this.index--;
    }
};

Slider.fx.goTo = function (index) {
    this.index = index;
};

Slider.fx.autoPlay = function () {
    this.to = setTimeout(function(){
        this.next();
    }, this.config.delay);
};

Slider.createSliders = function ($context) {
    var $context = $context || $('body'),
        sliders = [],
        $elem,
        slider;

    $context.find(this.DEFAULTS.containerSelector).each(function (index, elem) {
        $elem = $(elem);
        sliders.push(new Slider($elem, $elem.data()));
    });

    return sliders;
};
