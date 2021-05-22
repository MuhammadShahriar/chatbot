import { useEffect } from 'react';
import axios from './axios';
import './App.css';

function App() {

  useEffect (() => {
    // var postData = {
    //   email: "test@test.com",
    //   password: "password"
    // };
    
    // let axiosConfig = {
    //   headers: {
    //     'Authorization': `Bearer JsuZ0dwEdEQ.EiTsoGF15M5CL7ZD5Ds8Lbx4zpvSyfcXiEhfSDQhjFM`,
    //     'Content-Type': 'application/json'
    //   }
    // };
    const headers = {
      'Authorization': `Bearer JsuZ0dwEdEQ.EiTsoGF15M5CL7ZD5Ds8Lbx4zpvSyfcXiEhfSDQhjFM`,
      'Content-Type': 'application/json'
    }
    
    axios.post('', {}, {
        headers: headers
      })
      .then((response) => {
        console.log(response)
        // dispatch({
        //   type: FOUND_USER,
        //   data: response.data[0]
        // })
      })
      .catch((error) => {
        // dispatch({
        //   type: ERROR_FINDING_USER
        // })
      })
  }, [])

  return (
    <div className="app">
      <h1>In the name of ALLAH</h1>
    </div>
  );
}

export default App;
