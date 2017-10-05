import { IComponentController, IComponentOptions, copy } from "angular";

import TodoService from "./shared/todo.service";
import AppState, { Todo } from "../shared/app-state";
import "./todo.component.scss";

class TodoController implements IComponentController {
	static $inject = ["appState", "TodoService"];
	todo: Todo;
	todos: Array<Todo>;

	constructor(private appState: AppState, private todoService: TodoService) {}

	$onInit() {
		this.initTodo();
		this.appState.todos$.subscribe(
			(todos: Array<Todo>) => (this.todos = todos)
		);
	}

	onAdd() {
		if (this.todo && this.todo.title) {
			this.todoService.post(this.todo);
			//this.appState.setTodos([...this.todos, this.todo]);
			this.initTodo();
		}
	}

	onComplete(todo) {
		this.todoService.put(todo);
		//this.appState.setTodos([...this.todos]);
	}

	onRemove(todo: Todo) {
		this.todoService.delete(todo);
		// this.appState.setTodos([
		// 	...this.todos.filter(todoObj => todoObj !== todo)
		// ]);
	}

	onEdit(todo: Todo) {
		this.todo = copy(todo);
	}

	private initTodo() {
		this.todo = {
			title: "",
			completed: false
		};
	}
}

const todoComponent: IComponentOptions = {
	controller: TodoController,
	template: require("./todo.component.html") as string
};

export default todoComponent;
