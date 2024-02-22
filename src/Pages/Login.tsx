import {Signal, signal} from "@preact/signals-react";
import {login} from "../Services/HttpServices";
import {useNavigate} from "react-router-dom";

interface ILoginFormState {
    email: string;
    password: string;
    error: string;
}

const loginFormState: Signal<ILoginFormState> = signal({
    email: '',
    password: '',
    error: '',
});

export const loginUserInfo: Signal<IUser> = signal({
    userName: '',
    userEmail: '',
    token: '',
})

function updateLoginFormState(field: keyof ILoginFormState, value: string) {
    console.log({field})
    console.log({value})
    loginFormState.value = {...loginFormState.value, [field]: value}
}

export interface IUser {
    userName: string;
    userEmail: string;
    token: string;
}

export const Login = () => {

    const navigate = useNavigate()
    const handleLoginBtnClick = async () => {
        console.log(loginFormState.value)
        try {
            const user: IUser = await login(
                {
                    email: loginFormState.value.email,
                    password: loginFormState.value.password,
                }
            )
            console.log(user)
            loginUserInfo.value = (user)
            localStorage.setItem('userName', user.userName)
            localStorage.setItem('userEmail', user.userEmail)
            localStorage.setItem('token', user.token)
            navigate('/listings/create')
        } catch (e: any) {
            console.log(e)
            loginFormState.value = {...loginFormState.value, error: e.message}
        }
    }


    return <div className="bg-stone-700 text-white p-10 flex flex-col gap-4">
        <label>
            Username
            <input className="text-black" value={loginFormState.value.email}
                   onChange={e => updateLoginFormState('email', e.target.value)}/>
        </label>
        <label>
            Password
            <input className="text-black" value={loginFormState.value.password}
                   onChange={e => updateLoginFormState('password', e.target.value)}/>
        </label>
        <div>
            <button className="bg-blue-500 text-white px-4 py-2" type='submit' onClick={handleLoginBtnClick}>Log in
            </button>
        </div>
        {loginFormState.value.error && <p>{loginFormState.value.error}</p>}
    </div>
}