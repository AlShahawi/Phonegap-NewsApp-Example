var ngAppControllers = {
  categoriesController: function($scope, newsService)
  {
    $scope.pageTitle = "Select Category";

    var receiveData = function(data) {
      $scope.categories = data;
      ngAppUtilities.updateCategoriesViews();
      ngAppUtilities.hideLoading();
    };

    var showError = function(errorMsg) {
      ngAppUtilities.hideLoading();
      ngAppUtilities.showMessage(errorMsg);
    };

    ngAppUtilities.showLoading();
    newsService.categories.getAll(receiveData, showError);

    $scope.setSelected = function(index) {
      newsService.categories.select(index);
    };

    $scope.refresh = function() {
      ngAppUtilities.showLoading();
      newsService.categories.updateAsync(receiveData, showError);
    };
  },
  newsController: function($scope, newsService)
  {
    var receiveData = function(data) {
      $scope.news = data;
      ngAppUtilities.updateNewsViews();
      ngAppUtilities.hideLoading();
    };

    var showError = function(errorMsg) {
      ngAppUtilities.hideLoading();
      ngAppUtilities.showMessage(errorMsg);
    };

    newsService.on("selectCategory", function(category) {
      $scope.pageTitle = category.title;
      ngAppUtilities.showLoading();
      newsService.news.getAll(receiveData, showError);
    });

    $scope.setSelected = function(selectedIndex) {
      newsService.news.select(selectedIndex);
    };

    $scope.refresh = function() {
      ngAppUtilities.showLoading();
      newsService.news.updateAsync(receiveData, showError);
    };
  },
  detailsController: function($scope, newsService)
  {
    newsService.on("selectNews", function(news) {
      $scope.newsTitle = news.title;
      $scope.newsDetails = news.description;
    });
  }
}
