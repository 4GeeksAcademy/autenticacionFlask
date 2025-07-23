import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [email, setEmail] = useState ("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate();
	const API_URL = import.meta.env.VITE_BACKEND_URL

	const handleSignup = async (e) =>{
	    e.preventDefault();
	try {
		const response = await fetch(`${API_URL}api/signup`,{
			method : "POST",
			headers : {
				"Content-type" : "application/json"
			},
			body : JSON.stringify({email,password})
		})
		if(response.ok) {
			dispatch({type: "set_hello", payload: "Signup ha sido satisfactorio!"})
			navigate("/")
		}else {
			dispatch({type:"set_hello", payload: "Signup ha fallado"})
		}
	} catch (error) {
		dispatch({type:"set_hello", payload: "Signup ha fallado"})
		

	}
   }

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Componente Sign-up, para registrarnos</h1>
			{store.message &&(
				<div className="alert alert-info">
					{store.message}
				</div> 
			)}
			<form onSubmit={handleSignup}>
			<input
			type="email"
			value={email}
			onChange={(e) =>setEmail(e.target.value)}
			placeholder="Introduce aqui tu email"
			required
			/>

			<input
			type="password"
			value={password}
			onChange={(e) =>setPassword(e.target.value)}
			placeholder="Introduce aqui tu password"
			required
			/>

			<button type="submit">Registro</button>

			</form>
		
		</div>
	);
}; 