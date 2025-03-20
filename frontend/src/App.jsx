import { useState, useEffect } from 'react';
import DisplayContact from './components/DisplayContact';
import Filter from './components/Filter';
import DisplayAllContacts from './components/DisplayAllContacts';
import LoginPanel from './components/LoginPanel';
import personService from './services/persons';
import AppNotification from './components/AppNotification';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import loginService from './services/login'
import { jwtDecode } from 'jwt-decode'
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState('notification');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  {/*DO LATER: BREAk UP APP.JSX INTO FUTHER COMPONENTS*/}
  {/* -------------------------------------UseEFfects-------------------------------------*/}
  useEffect(() => {
    console.log("App component mounted");
    
    const loggedUserJSON = localStorage.getItem('loggedPhoneappUser');
    console.log("LocalStorage token:", loggedUserJSON);
    
    if (!loggedUserJSON) {
      console.log("No token found, user is not logged in");
      return;
    }
  
    const user = JSON.parse(loggedUserJSON);
    const decodedToken = jwtDecode(user.token);
    console.log("Decoded token:", decodedToken);
  
    if (decodedToken.exp * 1000 < Date.now()) {
      console.log("Token expired, logging out");
      handleLogout();
      return;
    }
  
    console.log("Token is valid, setting user state");
    personService.setToken(user.token);
    setUser(user);
  }, []);
  
  useEffect(() => {
    if (!user) {
      console.log("No user, skipping contacts fetch");
      return; // No user, stop here
    }
  
    console.log("User exists, fetching contacts");
    const controller = new AbortController();
  
    personService.getUserContacts({ signal: controller.signal })
      .then(contacts => {
        console.log("Contacts received:", contacts);
        if (Array.isArray(contacts)) {
          setPersons(contacts);
        } 
        else {
          console.warn("Received non-array response:", contacts);
          setPersons([]);
        }
      })
      .catch(error => {
        if (error.name !== 'CanceledError') {
          console.error("Error fetching contacts:", error);
          handleLogout(); // Redirect on error
        }
      });
  
    return () => controller.abort();
  }, [user]); // Only run when user state changes
 

{/* -------------------------------------LOGIN/OUT HANDLING-------------------------------------*/}
  const handleLogin = async(event) => {
    event.preventDefault();
    console.log("Login attempt with username:", username);
    
    try {
      const user = await loginService.login({username, password});
      console.log("Login successful:", user);
      
      window.localStorage.setItem(
        'loggedPhoneappUser', JSON.stringify(user)
      );
      console.log("User saved to localStorage");
      
      personService.setToken(user.token);
      console.log("Token set in personService");
      
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(exception) {
      console.error("Login failed:", exception);
      setNotifType('error');
      setNotifMessage('Wrong credentials');
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    
    // Clear token from localStorage
    localStorage.removeItem('loggedPhoneappUser');
    
    // Clear token from Axios
    personService.setToken(null);
    
    // Reset state
    setUser(null);
    setPersons([]);
    
    console.log("Logout complete");
  };

{/* ------------------------------------Phonebook manipulation-------------------------------------*/}
  const addName = (event) => {
    event.preventDefault();

    const nameCheck = persons.some(person => person.name === newName);
    const numCheck = persons.some(person => person.number === newNumber);

    if (!nameCheck && !numCheck) {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotifType('notification');
          setNotifMessage(`Added ${personObj.name}`);
        })
        .catch(error => {
          console.error('Error details:', error);

          if (error.response?.data?.error) {
            setNotifType('error');
            setNotifMessage(error.response.data.error);
          } else {
            setNotifType('error');
            setNotifMessage('Something went wrong!');
          }
        });
    } else if (nameCheck) {
      const existingPerson = persons.find(person => person.name === newName);
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ));
          setNotifType('notification');
          setNotifMessage(`${existingPerson.name}'s number updated.`);
        })
        .catch(error => {
          console.error('Error updating contact:', error);
          setNotifType('error');
          setNotifMessage('Failed to update contact.');
        });
    } else if (numCheck) {
      setNotifType('error');
      setNotifMessage(`${newNumber} is already in the phonebook.`);
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteContact = (person) => {
    personService
      .delEntry(person.id)
      .then(() => {
        onDelete(person.id);
        setNotifType('notification');
        setNotifMessage(`Deleted ${person.name}`);
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
        setNotifType('error');
        setNotifMessage(
          `Information of ${person.name} has already been removed from the server.`
        );
        setPersons(persons.filter(p => p.id !== person.id));
      });
  };

  const onDelete = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  };

  const contactsToShow = Array.isArray(persons)
    ? (!filter
        ? persons
        : persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          ))
    : [];

{/*---------------------------------------RENDER---------------------------------------*/}
  return (
    <Wrapper>
      <AppWrapper>
        <Navbar user={user} handleLogout={handleLogout}/>
        <Phonebook user={user}>
        {user?(<>
          <LeftHalf>
            <h2>Contacts</h2>
            <Filter filterStr={filter} onChangeFnc={handleFilter} />
            <DisplayAllContacts contactsToShow={contactsToShow} onClickx={deleteContact} />
          </LeftHalf>

          <RightHalf>
            <p className='sectionIntro'>
              Add new contacts here
            </p>
            <form onSubmit={addName}>
              <div>
              {/*
                <div>debug: {newName} number: {newNumber}</div>
              */}
                Name:<input data-testid='name' value={newName} onChange={handleNameChange}/>
                <br/>
                Number:<input data-testid='number'  value={newNumber} onChange={handleNumberChange}/>
              </div>
              <div className='buttonWrapper'>
                <button type="submit">Add Contact</button>
              </div>
            </form>
            <AppNotification message={notifMessage} notif_type={notifType} />
          </RightHalf>
        </>
        ):(<>
            <LoginPanel
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            />
          <AppNotification message={notifMessage} notif_type={notifType} />
        </>
        )}
        </Phonebook>
    </AppWrapper>
    <Footer/>
  </Wrapper>
  );
};

{/*---------------------------------------STYLING---------------------------------------*/}
const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: center;
  padding: 50px 0px 0px 0px;

  background: radial-gradient(circle, 
    rgba(177, 104, 70, 0.9) 0%,   /* Lighter dark brown center */
    rgba(78, 24, 24, 0.9) 20%,  /* Medium dark brown */
    rgba(53, 19, 5, 1) 100%    /* Darkest brown edges */
  );
  
  min-height:100vh;
  justify-content: space-between; //for aligning footer with page bottom
`
const AppWrapper = styled.div`
  width:66%;
  display:flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 150px;
  
`
const Phonebook = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #d3fcb8;
  min-height: 560px;
  
  ${props => !props.user && `
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    height: auto;
    min-height: 400px;
  `}
`;

const LeftHalf = styled.div`
  width:60%;
  //border: 1px solid red;

  h2{
    margin-top: 0px;
    margin-bottom: 10px;
    font-size: 2rem;
  }
`

const RightHalf = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border-left: 1px solid gray;
  padding: 0px 8px;

  form {
    display: flex;
    padding:20px 6%;
    display: grid;
    width: 80%;
    gap: 10px; 
    align-items: center;
    width: 100%;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    
  }
  .buttonWrapper{
    display: flex;
    justify-content: end;
    //border: 1px solid blue;
  }
  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
  }
  button:hover {
    background-color: #45a049;
  }
  .sectionIntro{
    font-size: 1.7rem;
    font-weight: bold;
  }
`;

export default App;
