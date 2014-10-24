// ngApp object contains the main functions to initialize the application
var ngApp = {
  module: null,
  initialize: function()
  {
	// initialize our angular module
    this.module = angular.module("newsGetterIndex", []);
	// load our controllers
    this.module.controller("categoriesController", ngAppControllers.categoriesController);
    this.module.controller("newsController", ngAppControllers.newsController);
    this.module.controller("detailsController", ngAppControllers.detailsController);
	// inject our service to be used via our controllers
    this.module.service("newsService", ngAppServices.newsService);
  }
};

// initialize the application
ngApp.initialize();
