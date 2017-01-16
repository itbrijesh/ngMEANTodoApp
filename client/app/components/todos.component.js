"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todos_service_1 = require('./services/todos.service');
var TodosComponent = (function () {
    function TodosComponent(_service) {
        this._service = _service;
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getTodos().subscribe(function (data) {
            _this.todos = data;
            console.log('TODO: ' + _this.todos[0]);
        });
    };
    TodosComponent.prototype.addTodo = function (event, todoText) {
        var _this = this;
        console.log(todoText.value);
        var newTodo = {
            "text": todoText.value,
            "isCompleted": false
        };
        this._service.saveTodo(newTodo).subscribe(function (data) {
            _this.todos.push(newTodo);
        });
    };
    TodosComponent.prototype.editTodo = function (id, todo) {
        console.log('Editing todo : ' + todo);
    };
    TodosComponent.prototype.deleteTodo = function (id) {
        console.log('Deleting todo with id : ' + id);
        this._service.deleteTodo(id).subscribe(function (data) {
            console.log('Todo deleted : ' + data);
        });
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            "text": todo.text,
            "isCompleted": !todo.isCompleted,
            "_id": todo._id
        };
        this._service.updateStatus(_todo).subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.setEditStatus = function (status, todo) {
        if (status) {
            todo.isEditMode = status;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.cancelEdit = function (todo) {
        this.setEditStatus(false, todo);
    };
    TodosComponent.prototype.updateText = function (event, todo) {
        var _this = this;
        if (event.which == 13) {
            todo.text = event.target.value;
            var _todo = {
                "_id": todo._id,
                "text": todo.text,
                "isCompleted": todo.isCompleted
            };
            console.log('Updating   : ' + JSON.stringify(_todo));
            this._service.updateTodo(_todo).subscribe(function (data) {
                _this.setEditStatus(false, todo);
            });
        }
    };
    TodosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todos',
            templateUrl: 'todo.component.html'
        }), 
        __metadata('design:paramtypes', [todos_service_1.TodosService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map