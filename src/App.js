import "./App.css";
import { UseState } from "./components/UseState/UseState";
import UseReducer from "./components/useReducer";
/* con  code -r ./    podes entrar directo al code en donde vos queres*/
function App() {
	return (
		<div className="App">
			<UseState name="UseS tate" />
			<UseReducer name="use RReducer" />
		</div>
	);
}

export default App;
