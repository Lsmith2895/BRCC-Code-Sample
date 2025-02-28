import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  makeStyles,
  Fab,
  Container,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TODO, GET_TODOS } from '../document-nodes/todo';
import TodoList from '../components/TodoList';
import TodoCount from '../components/TodoCount';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#1976D2', // Nice blue color
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  searchField: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: theme.spacing(1),
    width: '300px',
    margin: '12px',
  },
  container: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  fab: {
    marginLeft: theme.spacing(1),
  },
  form: {
    display: 'flex',
  }
}));

const Index = () => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(GET_TODOS);

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [todoTitle, setTodoTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for filtering todos

  const handleAddTodo = async (event) => {
    event.preventDefault();

    if (!todoTitle.trim()) return;

    try {
      await addTodo({
        variables: {
          data: { title: todoTitle, completed: false },
        },
      });
      setTodoTitle('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error!</Typography>;
  }

  const filteredTodos = data.todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    {/* I would like to update the UI to remove the other header from the application in Layout but not a part of the scope of this work */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BRCC's ToDo List Creator
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search Todos..."
            className={classes.searchField}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" className={classes.container}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddTodo(event);
          }}
          className={classes.form}
        >
          <TextField
            label="Input task title"
            variant="outlined"
            className={classes.textField}
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
          />
          <Fab color="primary" aria-label="add" className={classes.fab} type="submit">
            <AddIcon />
          </Fab>
        </form>

        <TodoCount todos={{ todos: filteredTodos }} />
        <TodoList todos={{ todos: filteredTodos }} />
      </Container>
    </>
  );
};

export default Index;
