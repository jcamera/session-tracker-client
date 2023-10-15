import { useState } from 'react'

import '../styles/App.css'
import { useSessionData } from '../hooks/useSessionData';
import { useWebSockets } from '../hooks/useWebSockets';
import SessionForm from './SessionForm';
import SessionTable from './SessionTable';
import { Grid } from '@mui/material';
import { Session } from '../lib/types';
import Login from './Login';

function Dashboard() {

  /**for local demo default to true */
  //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);


  const [sessions=[], isLoading] = useSessionData(isLoggedIn);
  const [sessionsRT=[]] = useWebSockets(isLoggedIn);
  const [selectedRow, setSelectedRow] = useState(null);

  const sessionData: Session[] = 
    sessionsRT?.length ? sessionsRT
    : sessions?.length ? sessions 
    : []; 
  
  const selectedRowData = sessionData?.find( row => row.id == selectedRow);

  return (
    <>
    <h3>Parking Session Tracker</h3>
    {
      isLoggedIn ? (
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            {
              sessionData.length ? (
                <SessionTable data={sessionData} setSelectedRow={setSelectedRow} isLoading={isLoading}/>
              ) : (
                <div className="placeholder">no sessions</div>
              )
            } 
          </Grid>
          <Grid item xs={12} sm={6}>
            <SessionForm selectedRow={selectedRowData}/>
          </Grid>
        </Grid>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn}/>
      )
    }
    </>
  )  
}

export default Dashboard;
