import { useEffect, useState } from 'react';
import axios from './axios';
import './App.css';import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function App() {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState(null);
  

  const getMessages = () => {
    const headers = {
      'Authorization': `Bearer JsuZ0dwEdEQ.EiTsoGF15M5CL7ZD5Ds8Lbx4zpvSyfcXiEhfSDQhjFM`,
      'Content-Type': 'application/json'
    }
    
    axios.get(`${chatId}/activities`, {
        headers: headers
      })
      .then((response) => {
        setMessages(response.data.activities);
      })
      .catch((error) => {
      })
  }

  const sendMessage = (e) => {
    if(e) e.preventDefault();

    const headers = {
      'Authorization': `Bearer JsuZ0dwEdEQ.EiTsoGF15M5CL7ZD5Ds8Lbx4zpvSyfcXiEhfSDQhjFM`,
      'Content-Type': 'application/json'
    }

    const body = {
        "locale": "en-EN",
        "type": "message",
        "from": {
            "id": "user1"
        },
        "text": input
    }

    axios.post(`${chatId}/activities`, body, {
      headers: headers
    })
    .then((response) => {
      getMessages();
    })
    .catch((error) => {
    })

    setInput ("");
  }


  useEffect (() => {
  
    const headers = {
      'Authorization': `Bearer JsuZ0dwEdEQ.EiTsoGF15M5CL7ZD5Ds8Lbx4zpvSyfcXiEhfSDQhjFM`,
      'Content-Type': 'application/json'
    }
    
    axios.post('', {}, {
        headers: headers
      })
      .then((response) => {
        setChatId ( response.data.conversationId );
      })
      .catch((error) => {
      })
  }, [])

  useEffect (() => {
    if ( chatId ) {
      getMessages();
    }
  }, [chatId]);

  return (
    <div className = "app" >
      <div className = "chat__body">
        {messages? (
          messages.map ((message, id) => (
            <div key = {id} className = {`chat__message ${message.from.id === 'user1' && "chat__receiver"}`}>
              <p className = "chat__messageText" >
                {message.text}
              </p>

              {message.suggestedActions? (
                <div className = "chat__message--options" >
                  
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={input}
                      onChange={(e) => setInput ( e.target.value )}
                    >
                      {message.suggestedActions.actions.map (( option, id1 ) => (
                        <MenuItem value={option.value}>{option.value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : 
              (<></>)}
            </div>
          ))
          ) : (<></>)
        }

      </div>
            

            
      <div className = "chat__footer">
        <form>
          <input
            value = {input}
            onChange = {(e) => setInput ( e.target.value )}
            placeholder = "Send a message"
            type = "text" 
          />

          <button 
            type = "submit"
            onClick = {sendMessage}
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
