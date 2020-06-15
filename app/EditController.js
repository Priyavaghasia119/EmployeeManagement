app.controller('EditController', function ($scope, $rootScope, $routeParams, Constant, $filter, $location, Employee_Service) {
    if (localStorage.getItem("Token") == null) {
        $location.url("/login");
    }
    else {
        var country_db = Employee_Service.GetCountry();
        country_db.then(function (response) {
            if (response) {
                $scope.country = response.data;
            }
        });

        $scope.statelist = function (countryName) {
            if (countryName) {
                var state_db = Employee_Service.GetState(countryName);
                state_db.then(function (response) {
                    $scope.state = response.data;
                });
            }
        };
        $scope.citylist = function (stateName) {
            if (stateName) {
                var city_db = Employee_Service.GetCity(stateName);
                city_db.then(function (response) {
                    $scope.city = response.data;
                });
            }
        };      

        var empdata = Employee_Service.GetEmployee($routeParams.id);
        empdata.then(function (response) {
            if (response) {
                if (response.data.BirthDate && response.data.EmplID > 0) {
                    var dob = response.data.BirthDate.toString();
                    dob = dob.replace("/Date(", "");
                    dob = dob.replace(")/", "");
                    response.data.BirthDate = Date(parseInt(dob));
                    response.data.BirthDate = new Date(parseInt(dob));
                }

                var hobby = [];
                if (response.data.Hobbies) {
                    var hobbylist = response.data.Hobbies;
                    var responsehb = hobbylist.split(",");
                    hobby = responsehb;
                }

                for (var i = 0; i < hobby.length; i++) {
                    if (hobby[i] == "Reading") {
                        $scope.hb1 = hobby[i];
                    }
                    if (hobby[i] == "Singing") {
                        $scope.hb2 = hobby[i];
                    }
                    if (hobby[i] == "Programming") {
                        $scope.hb3 = hobby[i];
                    }
                    if (hobby[i] == "Gardening") {
                        $scope.hb4 = hobby[i];
                    }
                    if (hobby[i] == "Writing") {
                        $scope.hb5 = hobby[i];
                    }
                }

                $scope.emp = response.data;
                $scope.statelist($scope.emp.CountryId);
                $scope.citylist($scope.emp.StateId);

            }
        });
        $scope.update = function () {
            var isValid = true;
            $scope.Bdate = $filter('date')($scope.emp.BirthDate, "yyyy-MM-dd");
            var birthdate = $scope.Bdate.toString();
            if (birthdate) {
                var today = new Date();
                var dob = birthdate.split('-');
                if (dob.length == 3) {
                    var birthDate = new Date(dob[0], dob[1] * 1 - 1, dob[2]);
                    var age = Math.floor((today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                    if (age < 18) {
                        $("#ErrorMessageForDob").html(Constant.BirthdateErrorMessage);
                        isValid = false;
                    }
                }
            }
            if ($scope.emp.Salary < 5000) {
                $("#ErrorMessageForSalary").html(Constant.SalaryErrorMessage);
                isValid = false;
            }
            if ($scope.emp.MaritalStatus == undefined) {
                $scope.emp.MaritalStatus = "No";
            }
            else {
                $scope.emp.MaritalStatus = "Yes";
            }

            hobby = [$scope.hb1, $scope.hb2, $scope.hb3, $scope.hb4, $scope.hb5];
            var hobbyList = "";
            for (var i = 0; i < hobby.length; i++) {
                if (hobby[i]) {
                    hobbyList ? hobbyList = hobbyList + ',' + hobby[i] : hobbyList = hobby[i]
                }
            }

            var file = null;
            if (document.getElementById("image").files.length > 0) {
                file = document.getElementById("image").files[0];
            }

            var formdata = new FormData();
            formdata.append("EmplID", $scope.emp.EmplID);
            formdata.append("FirstName", $scope.emp.FirstName);
            formdata.append("LastName", $scope.emp.LastName);
            formdata.append("Email", $scope.emp.Email);
            formdata.append("Gender", $scope.emp.Gender);
            formdata.append("MaritalStatus", $scope.emp.MaritalStatus);
            formdata.append("BirthDate", $scope.Bdate);
            formdata.append("Hobbies", hobbyList);
            formdata.append("user_image", file);
            formdata.append("Salary", $scope.emp.Salary);
            formdata.append("Address", $scope.emp.Address);
            formdata.append("CountryId", $scope.emp.CountryId);
            formdata.append("StateId", $scope.emp.StateId);
            formdata.append("CityId", $scope.emp.CityId);
            formdata.append("ZipCode", $scope.emp.ZipCode);
            formdata.append("Password", $scope.emp.Password);

            $scope.emplo = [empdata.$$state.value.data.FirstName, empdata.$$state.value.data.LastName, empdata.$$state.value.data.Email];
            $scope.$watchCollection('emplo', function (newValue,oldValue) {
                console.log(oldValue);
                console.log(newValue);
                
            });

            if (isValid == true) {
                var editEmployee = Employee_Service.EditEmployee(formdata);
                editEmployee.then(function (response) {
                    if (response && response.data && response.data.success == true) {
                        $rootScope.$on("evtforedit", function (event, data) {
                            alert(data + Constant.EditSuccessMessage);
                        });
                        $location.url('/list');                        
                    }
                    else {
                        alert(Constant.FailErrorMessage);
                    }
                });
            }
        };
    }
});