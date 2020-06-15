app.service("Employee_Service", function ($http, Constant) {
    

    this.GetEmployeeData = function () {       
    // return $http.get(Constant.APIURL + "GetEmployeeData");
       return $http.get("http://localhost:50830/API/GetEmployeeData");
    }
       
    this.AddEmployee = function (formdata) {     
        return $http({
            method: 'POST',
            url: "http://localhost:50830/APISP/AddEmployee",
            data: formdata,
            transformRequest: angular.identity,          
            headers: { 'Content-Type': undefined }  
        });
    };    
       
    this.GetEmployee = function (EmplID) {        
        return $http.get("http://localhost:50830/API/GetEmployee?id=" + EmplID);        
    };

   
    this.EditEmployee = function (formdata) {       
        return $http({
            method: 'POST',
            url: "http://localhost:50830/APISP/EditEmployee",
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });            
    };

    this.DeleteEmployee = function (id) {       
        return $http.delete("http://localhost:50830/APISP/DeleteEmployee?id=" + id);                     
      
    };

    this.GetCountry = function () {
        return $http.get("http://localhost:50830/API/GetCountry"); 
    };

    this.GetState = function (country) {        
        return $http.get("http://localhost:50830/API/GetState?countryId=" + country);
    };

    this.GetCity = function (state) {
        return $http.get("http://localhost:50830/API/GetCity?stateId=" + state);
    };

   
    this.LoginEmployee = function (formdata) {
        return $http({
            method: 'POST',
            url: "http://localhost:50830/API/LoginEmployee",
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };            

});


