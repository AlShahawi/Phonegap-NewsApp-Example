var ngAppUtilities = {
  showLoading: function(){
    var interval = setInterval(function() {
        $.mobile.loading('show');
        clearInterval(interval);
    }, 1);
  },
  hideLoading: function(){
    var interval = setInterval(function() {
      $.mobile.loading('hide');
      clearInterval(interval);
    }, 1);
  },
  updateCategoriesViews: function() {
    setTimeout(function() {
       $("#categoriesListView").listview("refresh");
       }, 100);
  },
  updateNewsViews: function() {
    setTimeout(function() {
       $("#newsListView").listview("refresh");
       }, 100);
  },
  showMessage: function(message) {
    var interval = setInterval(function() {
      $.mobile.loading( "show", {
              text: message,
              textVisible: true,
              theme: "a",
              textonly: true,
              html: ""
      });
      clearInterval(interval);
    }, 1);
  }
};
