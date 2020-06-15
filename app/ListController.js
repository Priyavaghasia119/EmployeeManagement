app.controller('ListController', function ($scope, $rootScope, $log, $location, $uibModal, Constant, Employee_Service) {   
    $rootScope.currentUser = localStorage.getItem("Token");
    if ($rootScope.currentUser == null) {
        $location.url("/login");
    }
    else {        
        $rootScope.$emit("evtforadd", $rootScope.currentUser);
        $rootScope.$broadcast("evtforedit", $rootScope.currentUser);             
        
        var getEmployeeData = Employee_Service.GetEmployeeData();
        getEmployeeData.then(function (response) {
            $rootScope.employees = response.data;
            $scope.view = 5;
            $scope.totalItems = $scope.employees.employee.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.view;

            $scope.setItemsPerPage = function (number) {
                $scope.itemsPerPage = number;
                $scope.currentPage = 1;
            };

            $scope.pageChanged = function () {               
            };
            
            $scope.delete = function (id) {
                $scope.deleteuser = id;
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'delete.html',
                    controller: 'DeleteController',
                    controllerAs: '$ctrl',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    var deleteEmployee = Employee_Service.DeleteEmployee($scope.deleteuser);                    
                    deleteEmployee.then(function (employee) {
                        if (employee && employee.data && employee.data.success == true) {
                            alert(Constant.DeleteSuccessMessage);                              
                            $location.url('/list');
                        }
                    });
                });
            }

        }, function (error) {
            alert(Constant.FailErrorMessage);
        });

    }   
    $scope.logout = function () {   
        $scope.$watch("currentUser", function (newValue, oldValue) {
            alert(newValue + Constant.LogoutMessage);
        });
        var isLogin = localStorage.getItem("Token");
        if (isLogin != null) {
            localStorage.removeItem("Token");            
            $location.url("/login");
        }
    };

});

app.controller('DeleteController', function ($uibModalInstance) {
    $ctrl = this;
    $ctrl.ok = function () {
        $uibModalInstance.close();
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
    };
});

//app.directive('employee', function ($parse) {
//    return {
//        restrict: 'E',
//        link: function (scope, element, attrs) {
//            var model = $parse(attrs.ngEmployee);
//            var modelSetter = model.assign;
//            element.bind('change', function () {
//                scope.$apply(function () {
//                    modelSetter(scope, element[0].files[0]);
//                });
//            });

//        }
//    };
//});

