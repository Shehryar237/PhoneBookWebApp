import { useState, useEffect } from 'react';
import styled from 'styled-components';

const LoginButton = ({bttnColor, onClick}) => {
    return(
        <Wrapper bttnColor={bttnColor}>
            <button type='submit' onClick={onClick}>Login</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    background-color: transparent;
    width: 80px;

    button {
        width: 100%;
        border-radius: 10px;
        background-color: ${(props) => props.bttnColor};
        border: none;
        padding: 8px;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease; 
    }

    button:hover {
        background-color: #3e8e41; 
        transform: scale(1.05); /* zoom effect */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
    }

    button:active {
        background-color: #2e7031; 
        transform: scale(0.95); 
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
    }
`

export default LoginButton