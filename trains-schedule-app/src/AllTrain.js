// AllTrainsPage.js
import React, { useState } from 'react';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

const trainData = [
  { id: 1, trainName: 'Express Train', price: 50, tickets: 100, departureTime: '09:00', delay: 0 },
  { id: 2, trainName: 'Super Express', price: 60, tickets: 50, departureTime: '10:30', delay: 10 },
  { id: 3, trainName: 'Local Train', price: 30, tickets: 200, departureTime: '11:15', delay: 5 },
  // Add more train data here as needed
];

const AllTrainsPage = () => {
  const [trains, setTrains] = useState(trainData);

  const sortTrains = () => {
    const sortedTrains = [...trains].sort((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      } else if (a.tickets !== b.tickets) {
        return b.tickets - a.tickets;
      } else {
        const aDepartureTime = addMinutes(a.departureTime, a.delay);
        const bDepartureTime = addMinutes(b.departureTime, b.delay);
        return new Date(aDepartureTime) - new Date(bDepartureTime);
      }
    });

    setTrains(sortedTrains);
  };

  const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes);
    return date.toTimeString().slice(0, 5);
  };

  return (
    <Container>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Trains Schedule
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Train Name</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                  <TableCell align="right">Tickets</TableCell>
                  <TableCell align="right">Departure Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trains.map((train) => (
                  <TableRow key={train.id}>
                    <TableCell component="th" scope="row">
                      {train.trainName}
                    </TableCell>
                    <TableCell align="right">{train.price}</TableCell>
                    <TableCell align="right">{train.tickets}</TableCell>
                    <TableCell align="right">
                      {addMinutes(train.departureTime, train.delay)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllTrainsPage;
