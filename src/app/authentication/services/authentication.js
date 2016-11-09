function Authentication($http, Session) {
    return {
        login: login,
        isAuthenticated: isAuthenticated,
        logout:logout,
        isActive
    };

    function login(email, password) {
        var promise = $http.post("http://localhost:3000/login", {
            email: email,
            password: password
        });

        return promise.then(function(response) {
            Session.create(response.headers("Authorization"), response.data);
            console.log(response.headers('Authorization'));
            return response;
        });
    }

    function isAuthenticated() {
        return Session.isActive();
    }

    function logout() {
        Session.destroy();
    }

    function isActive(){
    	return Session.isActive();
    }

}

angular
    .module("auth")
    .service("Authentication", Authentication);
