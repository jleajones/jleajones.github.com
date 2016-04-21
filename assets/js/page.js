var page = (function() {
    var page = {};
    
    //tracking
    page.tracker = new Tracker({
        
    });
    page.tracker.track();
    
    page.forms = Form.createForms();
    page.cards = Card.createCards();
    page.sliders = Slider.createSliders();
    
    return page;
}());

console.log(page);