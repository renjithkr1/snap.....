import { module } from 'angular';

import todoComponent from './todo.component';
import TodoService from './shared/todo.service';
//import todoConfigure from './todo.config';

const todo = module('todo', [])
    .component('todo', todoComponent)
    //.config(todoConfigure)
    .service("TodoService", TodoService)
    .name;

export default todo;