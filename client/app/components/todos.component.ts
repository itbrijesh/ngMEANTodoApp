import { Component, OnInit } from '@angular/core';
import { Todo } from './services/todo';
import { TodosService } from './services/todos.service';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todo.component.html'
})
export class TodosComponent implements OnInit {
    todos: any[];
    constructor( private _service: TodosService ) {

    }

    ngOnInit() {
        this._service.getTodos().subscribe(
            data => {
                this.todos = data;
                console.log( 'TODO: ' + this.todos[0] );
            }
        );
    }

    addTodo(event: any, todoText: any) {
        console.log( todoText.value );
        var newTodo = {
            "text": todoText.value,
            "isCompleted": false
        }

        this._service.saveTodo( newTodo ).subscribe(
            data => {
                this.todos.push( newTodo );
            }
        )
    }

    editTodo( id: string, todo: string ) {
        console.log( 'Editing todo : ' + todo );
    }

    deleteTodo( id: string ) {
        console.log( 'Deleting todo with id : ' + id );
        this._service.deleteTodo( id ).subscribe( 
            data => {
                console.log( 'Todo deleted : ' + data );
            }
        )
    }

    updateStatus( todo :Todo ) {
        var _todo = {
            "text" : todo.text,
            "isCompleted" : !todo.isCompleted,
            "_id" : todo._id
        };

        this._service.updateStatus( _todo ).subscribe(
            data => {
                todo.isCompleted = !todo.isCompleted;
            }
        );
    }

    setEditStatus( status: boolean, todo: any ) {

        if( status ) {
            todo.isEditMode = status;
        }
        else{
            delete todo.isEditMode;
        }
    }

    cancelEdit( todo: any ) {
        this.setEditStatus( false, todo );
    }

    updateText( event: any, todo : any ) {

        if( event.which == 13 )
        {
            todo.text = event.target.value;
            var _todo = {
                "_id" : todo._id,
                "text" : todo.text,
                "isCompleted" : todo.isCompleted
            }   
            console.log('Updating   : ' + JSON.stringify( _todo ) );
            this._service.updateTodo( _todo ).subscribe(
                data => {
                            this.setEditStatus( false, todo );
                }
            );
        }
    }
}