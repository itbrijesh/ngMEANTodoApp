import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Todo } from './todo'

@Injectable()
export class TodosService {
    constructor( private _http: Http ) {

    }

    getTodos() {
        console.log('Calling MondoDB REST API to get all todos...')
        return this._http.get('/api/v1/todos').map( data => data.json() );
    }

    saveTodo( todo: any ) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        return this._http.post( '/api/v1/todo', JSON.stringify( todo ) ,{headers: headers} )
                  .map( res => res.json() );
    }

    updateTodo( todo: Todo ) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        return this._http.put( '/api/v1/todo/' + todo._id, JSON.stringify( todo ), {headers: headers} )
                    .map( res => res.json() );
    }

    deleteTodo( id: string ) {
        return this._http.delete( '/api/v1/todo/' + id ).map( res => { res.json() } );
    }

    updateStatus( todo: Todo ) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        return this._http.put( '/api/v1/todo/' + todo._id, JSON.stringify( todo ), {headers:headers} )
                    .map( res => res.json() );
    }
}