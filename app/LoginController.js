app.controller('LoginController', function ($scope, $rootScope, Constant, $location, Employee_Service) {
    if (localStorage.getItem("Token") != null) {
        $location.url("/list");

    }
    $scope.login = function () {

        var formdata = new FormData();       
        formdata.append("Email", $scope.email);
        formdata.append("Password", $scope.password);

        var loginEmployee = Employee_Service.LoginEmployee(formdata);
        loginEmployee.then(function (success) {
            if (success && success.data && success.data.success == true) {
                var token = JSON.stringify(success.data.login.FirstName);                 
                localStorage.setItem("Token", token);                              
                $location.url("/list");
            }
            else
            {                
                alert(Constant.LoginFailMessage);
            }
        });
    }   

   
   
});