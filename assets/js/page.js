var page = (function() {
    var page = {};
    
    //tracking
    page.tracker = new Tracker({
        
    });
    page.tracker.track();
    
    page.forms = Form.createForms();
    
    return page;
}());