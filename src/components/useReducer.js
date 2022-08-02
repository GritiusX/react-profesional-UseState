import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "testing";

export default function UseReducer(props) {
	const inicialState = {
		value: "",
		error: false,
		loading: false,
		deleted: false,
		confirmed: false,
	};

	const actionTypes = {
		check: "CHECK",
		confirm: "CONFIRM",
		delete: "DELETE",
		error: "ERROR",
		reset: "RESET",
		write: "WRITE",
	};

	const reducerObject = (state, payload) => ({
		[actionTypes.check]: {
			...state,
			loading: true,
		},
		[actionTypes.confirm]: {
			...state,
			error: false,
			loading: false,
			confirmed: true,
		},
		[actionTypes.delete]: {
			...state,
			deleted: true,
		},
		[actionTypes.error]: {
			...state,
			error: true,
			loading: false,
		},
		[actionTypes.reset]: {
			...state,
			deleted: false,
			confirmed: false,
			value: "",
		},
		[actionTypes.write]: {
			...state,
			value: payload,
		},
	});

	const reducer = (state, action) => {
		if (reducerObject(state)[action.type]) {
			return reducerObject(state, action.payload)[action.type];
		} else {
			return state;
		}
	};

	const onWrite = (newValue) => {
		dispatch({ type: actionTypes.write, payload: newValue });
	};
	const onConfirm = () => dispatch({ type: actionTypes.confirm }); //usando UseReducer borramos setState y queda el dispatch
	const onError = () => dispatch({ type: actionTypes.error });
	const onCheck = () => dispatch({ type: actionTypes.check });
	const onDelete = () => dispatch({ type: actionTypes.delete });
	const onReset = () => dispatch({ type: actionTypes.reset });

	const [state, dispatch] = useReducer(reducer, inicialState);

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
				<button onClick={onCheck}>Comprobar</button>
			</div>
		);
	} else if (!state.deleted && !!state.confirmed) {
		return (
			<>
				<p>Seguro que quieres eliminar</p>
				<button onClick={onDelete}>Si,confirmar</button>
				<button onClick={onReset}>No, volver atras</button>
			</>
		);
	} else {
		return (
			<>
				<p>Eliminado con exito</p>
				<button onClick={onReset}>Recuperar UseReducer</button>
			</>
		);
	}
}
