import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Navbar = ({user, handleLogout}) => {
    return(
        <Wrapper>
            Phonebook
            {user&&(<LogoutButton onClick={handleLogout}>Logout</LogoutButton>)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    background-color: #4e0401;;
    color: white;
    height: 50px;
    width: 100%;
    border: 1px solid black;
    padding:0px 10px;
    align-items: center;
    font-size: 1.4rem;
    border-radius: 10px 10px 0px 0px;
    justify-content: space-between;
`
const LogoutButton = styled.button`
    background: none;
    border: 1px solid white;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background: #ffffff22;
    }
    
`;
export default Navbar