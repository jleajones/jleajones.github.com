---
layout: post
title: "Hello, World!"
date: 2015-06-06 11:18:58
category: general
---
Hello World!

{% highlight javascript linenos %}
var foo = (function(){
    var getUrl = function() {
        return window.location + window.location.hostname + window.location.path
    };
    return {
        url: getUrl()
    }
}());
{% endhighlight %}
