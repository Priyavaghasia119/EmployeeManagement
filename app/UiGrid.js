app.controller('UiGrid', function ($scope, $http, $location, Employee_Service) {
    if (localStorage.getItem("Token") == null) {
        $location.url("/login");
    }
    else {

        var getEmployeeData = Employee_Service.GetEmployeeData();        
        getEmployeeData.then(function (response) {
            $scope.data = response.data.employee;

            angular.forEach($scope.data, function (row) {
                row.getFullName = function () {
                    return this.FirstName + ' ' + this.LastName;
                }
            });

            angular.forEach($scope.data, function (row) {
                row.getBOD = function () {
                    var dob = this.BirthDate;
                    var birthdate = dob.toString();
                    birthdate = birthdate.replace("/Date(", "");
                    birthdate = birthdate.replace(")/", "");
                    var bd = new Date(parseInt(birthdate));
                    return bd;
                }
            });
        });


        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            paginationPageSizes: [5, 10, 20, 30],
            paginationPageSize: 10,
            data: 'data',
            columnDefs: [
                {
                    field: 'Photo',
                    cellTemplate: "<div class=\"ui-grid-cell-contents ng-scope ng-binding\" ng-if=\"COL_FIELD != null\"><img src=\"http://localhost:50830/image/{{COL_FIELD}}\" border=\"0\" width=\"25\">",
                    enableFiltering: false,
                    enableSorting: false,
                },
                { field: 'getFullName()', displayName: 'Full Name' },
                { field: 'Email', width: 180 },
                { field: 'Gender' },
                { field: 'MaritalStatus', displayName: 'Marital Status' },
                { field: 'getBOD()', displayName: 'Birth Date', cellFilter: 'date:\'dd-MM-yyyy\'' },
               
                { field: 'Hobbies', width: 210 },
                { field: 'CountryName' },
                { field: 'StateName' },
                { field: 'CityName' },
                { field: 'Salary' },
                { field: 'Address' },
                { field: 'ZipCode' }
            ]
        };
    }
});