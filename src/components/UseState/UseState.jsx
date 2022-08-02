import React, { useEffect, useState } from "react";
import "./UseState.css";

const SECURITY_CODE = "testing";

function UseState(props) {
	//const [state, dispatch] = useReducer(reducer, inicialState);
	// falta agregar el inicialState que puede ser el que esta en useReducer

	const [state, setState] = useState({
		value: "",
		error: false,
		loading: false,
		deleted: false,
		confirmed: false,
	});
	const onConfirm = () => {
		setState({
			...state,
			error: false,
			loading: false,
			confirmed: true,
		});
		//dispatch({type:actionTypes.confirm}) - usando UseReducer borramos setState y queda el dispatch
	};
	const onError = () => {
		setState({
			...state,
			error: true,
			loading: false,
		});
	};
	const onWrite = (newValue) => {
		setState({ ...state, value: newValue });
	};
	const onCheck = () => {
		setState({
			...state,
			loading: true,
		});
	};
	const onDelete = () => {
		setState({
			...state,
			deleted: true,
		});
	};
	const onReset = () => {
		setState({ ...state, deleted: false, confirmed: false, value: "" });
	};
	console.log(state);
	//const [value, setValue] = useState("");
	//const [error, setError] = useState(false);
	//const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log("iniciando");

		if (!!state.loading) {
			setTimeout(() => {
				console.log("haciendo validacion");

				if (state.value === SECURITY_CODE) {
					onConfirm();
				} else {
					onError();
				}

				console.log("terminando");
			}, 3000);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.loading]);

	if (!state.deleted && !state.confirmed) {
		return (
			<div>
				<h2>Eliminar {props.name}</h2>
				<p>Por favor, escribe el codigo de seguridad</p>
				{state.error && !state.loading && (
					<p className="error">Error: el codigo es incorrecto</p>
				)}
				{state.loading && <p className="">Cargando...</p>}
				<input
					type="text"
					placeholder="codigo de seguridad"
					value={state.value}
					onChange={(e) => {
						onWrite(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						onCheck();
					}}
				>
					Comprobar
				</button>
			</div>
		);
	} else if (!state.deleted && !!state.confirmed) {
		return (
			<>
				<p>Seguro que quieres eliminar</p>
				<button
					onClick={() => {
						onDelete();
					}}
				>
					Si,confirmar
				</button>
				<button onClick={() => onReset()}>No, volver atras</button>
			</>
		);
	} else {
		return (
			<>
				<p>Eliminado con exito</p>
				<button
					onClick={() =>
						setState({
							...state,
							deleted: false,
							confirmed: false,
							value: "",
						})
					}
				>
					Recuperar UseState
				</button>
			</>
		);
	}
}

export { UseState };
