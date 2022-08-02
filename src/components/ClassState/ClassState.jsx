import React from "react";
import { Loading } from "../Loading/Loading";
import "./ClassState.css";

const SECURITY_CODE = "testing2";

class ClassState extends React.Component {
	/* ---- codigo viejo: ---- */
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			error: false,
			loading: false,
		};
	}
	/* 	state = {
		value: "",
		error: false,
		loading: false,
	}; */
	/* 	UNSAFE_componentWillMount() {
		console.log("componentWillMount");
	} */

	componentDidMount() {
		console.log("componentDidMount");
	}
	componentDidUpdate() {
		console.log("actualizando");

		if (!!this.state.loading) {
			setTimeout(() => {
				console.log("haciendo la validacion");

				if (SECURITY_CODE === this.state.value) {
					this.setState({ error: false, loading: false });
				} else {
					this.setState({ error: true, loading: false });
				}

				console.log("terminando la validacion");
			}, 3000);
		}
	}

	render() {
		const { name } = this.props;
		const { error, loading, value } = this.state;

		return (
			<div>
				<h2>Eliminar {name}</h2>
				<p>Por favor, escribe el codigo de seguridad</p>
				{error && !loading && (
					<p className="error">Error: el codigo es incorrecto</p>
				)}
				{loading && <Loading />}

				<input
					type="text"
					placeholder="codigo de seguridad"
					value={value}
					onChange={(e) => this.setState({ value: e.target.value })}
				/>
				{/* codigo viejo -- <button onClick={() => this.setState({ error: !this.state.error})}>
					Comprobar
				</button> */}
				<button onClick={() => this.setState({ error: !error })}>
					Comprobar
				</button>
				<button onClick={() => this.setState({ loading: true })}>
					Loading
				</button>
			</div>
		);
	}
}

export { ClassState };
