import React, { useState } from 'react';
import {
  TextField,
  makeStyles,
  Fab,
  Container,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';

// Styles
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.spacing(55),
    maxWidth: theme.spacing(55),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

const Index = () => {
  const classes = useStyles();
  // TODO: Implement a useQuery for getting a list of current 
  // TODO: Implement a useMutation for adding TODOs to the list

  // TODO: implement state variable for todo
  
  // if (loading) {
  //   return <Typography>Loading...</Typography>;
  // }

  // if (error) {
  //   return <Typography>Error!</Typography>;
  // }

  return (
    <Container maxWidth={'sm'}>
      <form onSubmit={(event) => {
        event.preventDefault();
      }}>
        <TextField
          id="outlined-dense"
          label="Input task title"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          onChange={() => {}}
          value={''}
        />
        <Fab color="primary"
          aria-label="add"
          className={classes.fab}
          type="submit"
          onClick={() => {}}
        >
          <AddIcon/>
        </Fab>
      </form>
      {/* TODO: Render TodoList component and pass todos data */}
    </Container>
  );
};

export default Index;
