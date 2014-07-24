//modulo AngularJS
var TicketsManagement = angular.module('TicketsManagement', ['textAngular','growlNotifications', 'ngSanitize']).config(function ($locationProvider) {   $locationProvider.html5Mode(true).hashPrefix('!') });
var id;


angular.module('TicketsManagement').controller('Alerter', ['$scope','growlNotifications', function ($scope,growlNotifications) {
    
    // Add a notification
    
    $scope.Alert = function (message,type) {
        growlNotifications.add(message, type);
    };
    

}]);


angular.module('TicketsManagement')
    .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    

    $scope.formData = {};
    
    // Cuando se cargue la página, pide del API de los tickets
    
    
    //Busca tickets (Todos)
    $scope.refreshTicket = function () {
        $http.get('/api/tickets')
            .success(function (data) {
            $scope.tickets = data;
            console.log(data);

        })
            .error(function (data) {
            console.log('Error: ' + data);
        });
    };
    
    
    
    
    //devuelve un ticket
    $scope.GetTicket = function (id) {
        $http.get('/api/ticket/' + id)
    .success(function (data) {
            
            //ponemos valores del select2
            $("#levelpicker").val(data.level);
            $("#statuspicker").val(data.status);
            
            
            
            $('.selectpicker').selectpicker('refresh');
            
            

            
            $scope.formData = data;
            
            //$('select[name=levelpicker]').val(data.level);
            
            
          
        })
    .error(function (data) {
            console.log('Error: ' + data);
        });
    };
    
    
    // Añade un ticket
    $scope.AddTicket = function () {
        $http.post('/api/tickets', $scope.formData)
                    .success(function (data) {
            $scope.formData = {};
            $scope.tickets = data;
            window.location = "/"

        })

                    .error(function (data) {
            console.log('Error:' + data);
        });


    };
    
    
    // Actualiza un ticket
    $scope.UpdateTicket = function (id) {
        console.log($scope.formData);
        

        var date=new Date();
        $scope.formData.messages.push({ 'msg' : $scope.formData.msg, 'datetime': date });

        $http.post('/api/tickets/' + $scope.formData._id, $scope.formData)
                    .success(function (data) {
            $scope.formData = data;
            $('#Message').hide();
            $('html, body').animate({ scrollTop: $('#formdata').offset().top }, 'slow');

                      
        })
                    .error(function (data) {
            console.log('Error:' + data);
        });
    };
    
    
    
    //recoge el ticket de querystring
    $scope.ticketId = function () {
        
        //parámetros querystring.
        var id = window.location.pathname.replace('/UpdateTicket/', '');
        if (id != null) {
            $scope.GetTicket(id);
        }
        

    }
    
    
    // Borra un ticket
    $scope.RemoveTicket = function (id) {
        $http.delete('/api/tickets/' + id)
                .success(function (data) {
            $scope.tickets = data;
            $scope.refreshTicket();
            console.log(data);
        })
                .error(function (data) {
            console.log('Error:' + data);
        });
    };
    
    

    
    $scope.refreshTicket();

}]);
  

