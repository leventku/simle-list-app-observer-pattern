define([], function () {
  
  "use strict";

  function Subject() {
    this.handlers = [];
  };
   
  Subject.prototype = {
   
    subscribe: function(fn) {
      this.handlers.push(fn);
    },

    unsubscribe: function(fn) {
      this.handlers = this.handlers.filter(
        function(item) {
          if (item !== fn) {
            return item;
          }
        }
      );
    },

    publish: function(o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function(item) {
        item.call(scope, o);
      });
    }
  };

  return Subject;

});