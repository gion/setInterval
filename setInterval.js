(function(window, undefined) {

  function setInterval(fn, time) {
    setInterval.ids = setInterval.ids || {};
    setInterval.idCount = setInterval.idCount || 0;
    
    var self = this,
        id = setInterval.idCount++,
        // to prevent firefox bug that adds an extra element to the arguments
        l = arguments.length - 2;

    (function helperFn(){
      // to prevent firefox bug that adds an extra element to the arguments
      var args = Array.prototype.slice.call(arguments,0,l);
      fn.apply(this,args);
      setInterval.ids[id] = setTimeout.apply(this, [helperFn, time].concat(args));
    }).apply(self, [].slice.call(arguments, 2, arguments.length));

    return id;
  }


  function clearInterval(id) {
    if(!setInterval.ids || !setInterval.ids[id]) {
      return false;
    }

    clearTimeout(setInterval.ids[id]);
    return true;
  }

})(this);
