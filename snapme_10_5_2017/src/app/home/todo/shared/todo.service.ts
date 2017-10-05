import DataService from "../../../shared/data.service";

const apiEndPoint = {
	build: "http://localhost:2828",
	dist: "http://localhost:2828",
	distLocal: "http://192.168.29.31:2828"
};

const BASE_URL = apiEndPoint[__ENV];

class TodoService {
	static $inject = ["DataService"];

	constructor(private DataService: DataService) {}

	get() {
		return this.DataService.get("/todos", BASE_URL, {
			ignoreLoadingBar: true
		});
	}

	post(todo) {
		return this.DataService.post("/todos", todo, BASE_URL);
	}

	put(todo) {
		return this.DataService.put("/todos", todo.id, todo, BASE_URL);
	}

	delete(todo) {
		return this.DataService.delete("/todos", todo.id, BASE_URL);
	}
}

export default TodoService;
