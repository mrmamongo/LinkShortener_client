import React, {useContext, useEffect, useState} from "react";
import useHttp from '../hooks/http.hook';
import useMessage from "../hooks/message.hook";
import AuthContext from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    useEffect (() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            console.debug("Sending data: ", {...form});
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link Shortener</h1>
                <div className="card blue-grey lighten-3">
                    <div className="card-content white-text">
                        <span className="card-title">Sign in</span>
                        <div>
                            <div className="input-field">
                                <label htmlFor="email"/>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email" className="auth-input validate"
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password"/>
                                <input
                                    id="password" className="auth-input validate"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn teal"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login</button>
                        <button
                            className="btn grey darken-3"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}