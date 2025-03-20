import styled from 'styled-components';

const DisplayContact = ({ person, onClickx }) => {
    return (
        <ContactCard>
            <div className="info">
                <span className='name'>{person.name}</span> 
                <span className='number'>{person.number}</span>
            </div>
            <div className="options">
                <button onClick={() => onClickx(person)}>Delete</button>
                <button onClick={() => onClickx(person)}>Fav</button>
            </div>
        </ContactCard>
    );
};

const ContactCard = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    background-color: white;
    align-items: center;

    .info {
        display: flex;
        flex-direction: column;
    }
    .name {
        font-weight: bold;
        font-size: 1.2em;
    }
    .number {
        color: #555;
    }
    .options {
        display: flex;
        gap: 10px;
    }

    button {
        padding: 6px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #4e0401;
        color: white;
        font-weight: bold;
        transition: all 0.3s ease;

        &:hover {
            background-color: #912525;
        }
    }

    @media (max-width: 750px) {
        grid-template-columns: 1fr; 
    }
`;

export default DisplayContact;
