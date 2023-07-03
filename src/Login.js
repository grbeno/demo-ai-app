import React, {useContext} from 'react'
import AuthContext from "./AuthContext";


const Login = () => {

    const {login} = useContext(AuthContext)
    
    return (
    <div className="container">
        <form onSubmit={login}>
            <input type="text" name="username"/>
            <input type="password" name="password"/>
            <input type="submit" value="Login" />
        </form>
    </div>
    );
}

export default Login