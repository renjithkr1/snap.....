import { IComponentController, IComponentOptions } from "angular";
import { StateDeclaration } from "@uirouter/angularjs";
import { Observable } from "rxjs/Observable";

import { Todo } from "../app-state";
import "./nav.component.scss";

class NavComponentController implements IComponentController {
	state: StateDeclaration;
	activeMenuItem$: Observable<StateDeclaration>;
	todos$: Observable<Array<Todo>>;
	numberOfTodos: number;
	completedTodos: number;
	notCompletedTodos: number;

	constructor() {}

	$onInit() {
		this.activeMenuItem$.subscribe((state: StateDeclaration) => {
			this.state = state;
		});

		this.todos$.subscribe((todos: Array<Todo>) => {
			this.numberOfTodos = todos.length;
			this.completedTodos = todos.filter(
				(todo: Todo) => todo.completed
			).length;
			this.notCompletedTodos = this.numberOfTodos - this.completedTodos;
		});
	}
}

const NavComponent: IComponentOptions = {
	controller: NavComponentController,
	template: require("./nav.component.html") as string,
	bindings: {
        activeMenuItem$: "<",
        todos$:"<",
		onToggleSideMenu: "&",
		onLogoutClick: "&"
	}
};

export default NavComponent;
