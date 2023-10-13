import { useState } from 'react'

import '../styles/App.css'
import { useSessionData } from '../hooks/useSessionData';
import { useWebSockets } from '../hooks/useWebSockets';
import SessionForm from './SessionForm';
import SessionTable from './SessionTable';
import { Grid } from '@mui/material';
import { Session } from '../lib/types'

function Dashboard() {

  const [sessions=[], isLoading] = useSessionData();
  const [sessionsRT=[]] = useWebSockets();
  const [selectedRow, setSelectedRow] = useState(null);

  //console.log({sessions, sessionsRT});
  const sessionData: Session[] = 
    sessionsRT?.length ? sessionsRT
    : sessions?.length ? sessions 
    : []; 
  
  const selectedRowData = sessionData?.find( row => row.id == selectedRow);

  return (
    <>
    <h3>Parking Session Tracker</h3>
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
    </>
  )

  
}

export default Dashboard;
