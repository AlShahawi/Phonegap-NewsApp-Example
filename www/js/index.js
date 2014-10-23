var ngApp = {
  module: null,
  runningInPhonegap: null,
  initialize: function()
  {
    this.module = angular.module("newsGetterIndex", []);
    this.module.controller("categoriesController", ngAppControllers.categoriesController);
    this.module.controller("newsController", ngAppControllers.newsController);
    this.module.controller("detailsController", ngAppControllers.detailsController);
    this.module.service("newsService", ngAppServices.newsService);
  }
};

var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
if (app) {
  ngApp.runningInPhonegap = true;
  document.addEventListener('deviceready', ngApp.initialize, false);
} else {
  ngApp.runningInPhonegap = false;
  ngApp.initialize();
}
