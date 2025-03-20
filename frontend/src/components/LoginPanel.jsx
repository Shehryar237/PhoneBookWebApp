import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginButton from './LoginButton';
const LoginPanel = ({username, password, setUsername, setPassword, handleLogin}) => {
    return(
        <Wrapper>
            <p className='login'>Login</p>
            <LoginForm onSubmit={handleLogin}> 
                <input 
                    data-testid='username'
                    type='text'
                    value={username}
                    name="Username"
                    placeholder="Username"
                    onChange={({target})=>setUsername(target.value)}
                />
                <input
                    data-testid='password'
                    type="password"
                    value={password}
                    name="Password"
                    placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                <SignUp>
                    <a>SignUp</a>
                </SignUp>
                <LoginButton bttnColor="brown" type="submit"/> 
            </LoginForm>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    background-color: #fcfcb9;
    border: 1px solid yellows;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #d9ff52;;

    .login{
        font-weight: bold;
        font-size: 2rem;
    }
  
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap:5px;
    width: 60%;
    padding: 4px;
    //border: 1px solid blue;

    input{
        border-radius: 7px;
        border: 1px solid #d9ff52;
        padding: 9px;
    }
`

const ForgotPassword= styled.div`
    align-self: end;

    a{
        font-size: 0.8rem;
        color: blue;
        text-align: end;
        //border: 1px solid red;
    }
`

const SignUp= styled.div`
    align-self: end;
    margin-top: -4px;

    a{
        font-size: 0.8rem;
        color: blue;
        text-align: end;
        //border: 1px solid red;
    }
    
`
export default LoginPanel;
