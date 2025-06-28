import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BACKEND_URL
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            console.log("La informacion que me viene del backend es  :", data)
            dispatch({ type: "login", payload: { token: data } })
            navigate("/private")
        } catch (error) {
            console.log("Errror en el Login :", error)
        }
    }
    useEffect(() => {
    }, [])
    return (
        <div className="text-center mt-5">
            <h1>Componente Login, para acceder a tu cuenta.</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Introduce aqui tu email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Introduce aqui tu password"
                    required
                />
                <button type="submit">Logueate a tu cuenta</button>
            </form>
        </div>
    );
};
export default Login
