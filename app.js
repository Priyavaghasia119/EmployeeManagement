var app = angular.module('EmpApp', ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'ui.bootstrap.pagination', 'ui.grid', 'ui.grid.pagination', 'ui.grid.edit']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: 'app/Login.html',
            controller: 'LoginController'
        });

    $routeProvider  
        .when("/list", {
            templateUrl: 'app/List.html',
            controller: 'ListController'           
        });

    $routeProvider
        .when("/add", {
            templateUrl: 'app/Add.html',
            controller: 'AddController'
        });

    $routeProvider
        .when("/edit", {
            templateUrl: 'app/Edit.html',
            controller: 'EditController'
        });      
  
});

app.constant('Constant', {
    LoginFailMessage: 'Login failed, Please enter valid Email and Password.',
    FailErrorMessage: 'Oops! Something went wrong while fetching the data.',
    LogoutMessage: 'R u sure  you want to logout ??',
    BirthdateErrorMessage: 'Age must be above 18 years',
    SalaryErrorMessage: 'Minimum 5000 salary is required!',
    AddSuccessMessage: 'Successfully Added..!!',
    EditSuccessMessage: 'Successfully Edited..!!',
    DeleteSuccessMessage: 'Successfully Deleted..!!',
    APIURL: 'http://localhost:12345/'
});
