/**
 *
 * @param $form
 * @constructor
 */
function Form($form) {
    this.$form = $form;
    this.$inputs = this.$form.find(':input').not('button, :input[type=button], :input[type=submit], :input[type=reset]');
    this.$submit = this.$form.find('.submit-button'); //TODO: make configurable
    this.$succes = this.$form.next('.success'); //TODO: make configurable
    
    this.name = this.$form.attr('name');
    this.offset = $('header').height() + 20;

    this.initialize();
}

Form.fx = Form.prototype;


Form.fx.initialize = function () {

    //if there is no submit button, return;
    if (!this.$submit.length) return;

    this.$form.on('submit', $.proxy(this.validate, this));
};

/**
 *
 * @param e
 */
Form.fx.validate = function (e) {
    //prevent user triggered submit
    e.preventDefault();
    console.log(this.name + ': validating...');

    //remove all error messaging
    this.isInvalid = false;
    this.$inputs.each($.proxy(this.isInputValid, this));

    //form is valid to send to server
    if (!this.isInvalid) {
        console.log(this.name + ': valid...submitting to server!');
        //TODO: ajax post form data
        $('body, html').animate({
            scrollTop: 0
        }, $.proxy(this.success, this));
    } else {
        this.focus();
    }
};

Form.fx.success = function () {
    this.$form.addClass('animated bounceOut');
    setTimeout($.proxy(function(){
        this.$succes.show();
    }, this), 1000);
};

Form.fx.isInputValid = function (index, elem) {
    var $el = $(elem),
        value = $el.val(),
        $parent = $el.parent().removeClass('valid-error required-error has-error');

    if ($el.hasClass('required')) {
        //required fields cannot be empty
        if (value === '') {
            this.invalid($parent, 'required-error');
        }

        //required email fields must be valid emails
        if ($el.attr('type') === 'email') {
            var emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            if (!emailRegEx.test(value)) {
                this.invalid($parent, 'valid-error');
            }
        }
    }
};

Form.fx.invalid = function ($el, className) {
    $el.addClass(className + ' has-error');
    this.isInvalid = true;
};

Form.fx.focus = function () {
    var $error = this.$form.find('.has-error').first(),
        $input = $error.find('input');

    $input.length ? $input.focus() : $input = $error.find('textarea').focus();

    $('body, html').animate({
        scrollTop: $error.offset().top - this.offset
    });
};

/**
 *
 * @param context
 * @returns {Array}
 */
Form.createForms = function (context) {
    var $context = context || $('body'),
        forms = [];

    $context.find('form').each(function (index, elem) {
        forms.push(new Form($(elem)));
    });

    return forms;
};