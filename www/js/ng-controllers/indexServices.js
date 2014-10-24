// ngAppServices contains our news service to be used via news controllers
var ngAppServices = {
  newsService: function($http)
  {

    var categoriesData = [];
    var newsData = [];
    var selectedCategory = 0;
    var selectedNews = 0;

    // Categories services
    var categories = {
      cached: function() {
        return localStorage.lastUpdateDate ? true : false;
      },
      updateAsync: function(onSuccess, onError) {
        $http.get(config.categoriesServiceUrl)
        .success(function(response) {
          categoriesData = response;
          localStorage.lastUpdateDate = (new Date()).toString();
          localStorage.categoriesData = JSON.stringify(response);
          onSuccess(response);
        })
        .error(function(){
           if(onError) onError("connection error.");
           });
      },
      getAll: function(onSuccess, onError) {
        if (this.cached()) {
          categoriesData = JSON.parse(localStorage.categoriesData);
          onSuccess(categoriesData);
        }
        else {
          this.updateAsync(onSuccess, onError);
        }
      },
      select: function(index) {
        selectedCategory = index;
        fire("selectCategory", categoriesData[index]);
      },
      getSelected: function() { return selectedCategory; }
    };

    // News services
    var news = {
      cached: function() {
        return localStorage.getItem(categoriesData[selectedCategory].url) ? true : false;
      },
      updateAsync: function(onSuccess, onError) {
        $http.get(categoriesData[selectedCategory].url)
        .success(function(response) {
          newsData[categoriesData[selectedCategory].url] = response;
          localStorage.setItem(categoriesData[selectedCategory].url, JSON.stringify(response));
          onSuccess(response);
        })
        .error(function() {
           if(onError) onError("connection error.");
           });
      },
      getAll: function(onSuccess, onError) {
        if(this.cached()) {
          newsData[categoriesData[selectedCategory].url] = JSON
            .parse(localStorage.getItem(categoriesData[selectedCategory].url));
          onSuccess(newsData[categoriesData[selectedCategory].url]);
        }
        else {
          this.updateAsync(onSuccess, onError);
        }
      },
      select: function(index) {
        selectedNews = index;
        fire("selectNews", newsData[categoriesData[selectedCategory].url][index]);
      },
      getSelected: function(){ return selectedNews; }
    };

    var events = [];
    var on = function(event, callback) { events[event] = callback; }
    var fire = function(event, model) { if(events[event]) { events[event](model); } };

    return {
      categories: categories,
      news: news,
      on: on,
      fire: fire
    };
  }
};
