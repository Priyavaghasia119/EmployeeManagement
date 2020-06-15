app.controller('AddController', function ($scope, $rootScope, $location, Constant, $filter, Employee_Service) {
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

        $scope.statelist = function (countryname) {
            if (countryname) {
                var state_db = Employee_Service.GetState(countryname);
                state_db.then(function (response) {
                    $scope.state = response.data;
                });
            }
        };
        $scope.citylist = function (statename) {
            if (statename) {
                var city_db = Employee_Service.GetCity(statename);
                city_db.then(function (response) {
                    $scope.city = response.data;
                });
            }
        };

        $scope.submit = function () {
            var isValid = true;
            $scope.Bdate = $filter('date')($scope.DOB, "yyyy-MM-dd");
            var birthdate = $scope.Bdate.toString();
            if (birthdate) {
                var today = new Date();
                var dob = birthdate.split('-');                     
                if (dob.length == 3) {
                    var birthDate = new Date(dob[0],dob[1] - 1, dob[2]);
                    var age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
                    if (age < 18) {
                        $("#ErrorMessageForDob").html(Constant.BirthdateErrorMessage);
                        isValid = false;
                    }
                }
            }
            if ($scope.salary < 5000) {
                $("#ErrorMessageForSalary").html(Constant.SalaryErrorMessage);
                isValid = false;
            }

            if ($scope.maritalstatus == undefined) {
                $scope.maritalstatus = false;
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
            formdata.append("FirstName", $scope.firstName);
            formdata.append("LastName", $scope.lastName);
            formdata.append("Email", $scope.email);
            formdata.append("Gender", $scope.gender);
            formdata.append("MaritalStatus", $scope.maritalstatus);
            formdata.append("BirthDate", $scope.Bdate);
            formdata.append("Hobbies", hobbyList);
            formdata.append("user_image", file);
            formdata.append("Salary", $scope.salary);
            formdata.append("Address", $scope.address);
            formdata.append("CountryId", $scope.countryname);
            formdata.append("StateId", $scope.statename);
            formdata.append("CityId", $scope.cityname);
            formdata.append("ZipCode", $scope.zipcode);
            formdata.append("Password", $scope.password);

            //var formdata = {           
            //    FirstName: $scope.firstName,
            //    LastName: $scope.lastName,
            //    Email: $scope.email,
            //    Gender: $scope.gender,
            //    MaritalStatus: $scope.maritalstatus,
            //    BirthDate: $scope.DOB,
            //     Hobbies: $scope.hb1,           
            //    Salary: $scope.salary,
            //    Address: $scope.address,           
            //    CountryId: $scope.countryname,
            //    StateId: $scope.statename,
            //    CityId: $scope.cityname,
            //    ZipCode: $scope.zipcode,
            //    Password: $scope.password         
            //};  

            if (isValid == true) {
                var addEmployee = Employee_Service.AddEmployee(formdata);
                addEmployee.then(function (response) {
                    if (response && response.data && response.data.success == true) {
                        $rootScope.$on("evtforadd", function (event, data) {
                            alert(data + Constant.AddSuccessMessage);
                        });
                        $location.url('/list');                       
                    } else {
                        alert(Constant.FailErrorMessage);
                    }
                });
            }
        };
    }
});




