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
import { useMutation } from '@apollo/client';
import { ADD_TODO, GET_TODOS } from '../document-nodes/todo';

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
  
  
  // if (loading) {
  //   return <Typography>Loading...</Typography>;
  // }

  // if (error) {
  //   return <Typography>Error!</Typography>;
  // }

  // TODO: Implement a useMutation for adding TODOs to the list
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  // TODO: implement state variable for todo
  const [todoTitle, setTodoTitle] = useState('');

  const handleAddTodo = async (event) => {
    event.preventDefault();

    if (!todoTitle.trim()) return;

    try {
      await addTodo({
        variables: {
          data: {title: todoTitle, completed: false },
        },
      });
      setTodoTitle('');
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <Container maxWidth={'sm'}>
      {/* on submit could be moved out later */}
      <form onSubmit={(event) => {
        event.preventDefault();
        handleAddTodo(event);
      }}>
        <TextField
          id="outlined-dense"
          label="Input task title"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
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
