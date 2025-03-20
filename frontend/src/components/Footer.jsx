import React, { useState } from "react";
import styled from "styled-components";
import pyIcon from'./icons/pyicon.png';
import reacticon from './icons/reacticon.png'
import jsicon from './icons/jsicon.png'

const Footer = () => {
    return(
        <Wrapper>
            <div className="name">
                <p>
                Muhmmad Shehryar Nasir<br></br>                
                </p> 
            </div>
            <div className="iconTray">
                <img className="icon" src={jsicon}></img>
                <img className="icon" src={reacticon}></img>
                <img className="icon" src={pyIcon}></img>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.426) 0%, black 100%);
    color: white;
    font-size: 0.9rem;
    min-height: 250px;
    min-width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    //border: 1px solid white;
    
    .name{
        display: flex;
        text-align: center;
        padding-top: 60px;
    }
    .icon{
        height: 50px;
    }
    .iconTray{

        display: flex;
        gap: 10px;
        padding: 6px 0px 50px 0px;
    }
`

export default Footer;
