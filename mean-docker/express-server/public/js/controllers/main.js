angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.login.account != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.login)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.login = {}; // clear the form so our user is ready to enter another
						$scope.User= data; // assign our new list of todos
						$scope.iuser=data[0];
					});


			}


		};
		//注册
		$scope.register = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.user.account != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.user)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.user = {}; // clear the form so our user is ready to enter another
					});


			}


		};
		//存款
		$scope.deposit = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.deposit != undefined) {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				var dataForm={
					"account":$scope.iuser.account,
					"balance":$scope.iuser.balance+parseFloat($scope.deposit_money)
				};
				$scope.type=typeof($scope.iuser.balance)+" "+typeof(dataForm.balance);
				$scope.test=dataForm
				Todos.create(dataForm)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.iuser=data[0];
						$scope.deposit_money ={}; // clear the form so our user is ready to enter another
					});
			}
		};
		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);
