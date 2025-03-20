import DisplayContact from "./DisplayContact"
import styled from 'styled-components';

const DisplayAllContacts= ({contactsToShow, onClickx}) => {
    return(
        <ContactList>
            {
                contactsToShow.map(person=>
                    <DisplayContact person={person} onClickx={onClickx}/>
                )
            }
        </ContactList>
    )
}

const ContactList =styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(150px, 1fr));
    gap: 15px; 
    padding: 20px 10px;
    width: 100%;
    box-shadow: 0px 184px 3px -184px gray;

`
export default DisplayAllContacts