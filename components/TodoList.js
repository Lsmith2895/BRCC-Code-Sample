import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button, Checkbox, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, GET_TODOS, DELETE_TODO } from '../document-nodes/todo';

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2),
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: theme.spacing(1),
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    cursor: "pointer",
  },
  checkbox: {
    marginRight: theme.spacing(1),
  },
  cardActions: {
    paddingRight: theme.spacing(2),
  },
  textField: {
    width: "100%",
  }
}));

const TodoList = ({ todos }) => {
  const classes = useStyles();
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [updateTodo] = useMutation(UPDATE_TODO, {
    update(cache, { data: { updateTodo } }) {
      const existingTodos = cache.readQuery({ query: GET_TODOS });

      if (existingTodos) {
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            todos: existingTodos.todos.map((todo) =>
              todo.id === updateTodo.id ? updateTodo : todo
            ),
          },
        });
      }
    },
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    optimisticResponse: {
      deleteTodo: true,
    },
    update(cache, { variables }) {
      if (!variables || !variables.where || !variables.where.id) {
        return;
      }
      const deletedId = variables.where.id;
      const existingTodos = cache.readQuery({ query: GET_TODOS });

      if (!existingTodos || !existingTodos.todos) {
        return;
      }

      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: existingTodos.todos.filter(t => t.id !== deletedId),
        },
      });
    },
    refetchQueries: [{ query: GET_TODOS }],
    onError(err) {
      console.error("Apollo Error deleting todo:", err);
    },
  });

  const onToggleComplete = async (id, completed) => {
    try {
      await updateTodo({
        variables: {
          values: { completed: !completed },
          options: { id },
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const onEditTodo = (id, title) => {
    setEditingId(id);
    setEditedTitle(title);
  };

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSubmit = async (id) => {
    if (!editedTitle.trim()) return;

    try {
      await updateTodo({
        variables: {
          values: { title: editedTitle },
          options: { id },
        },
      });
    } catch (error) {
      console.error("Error updating todo title:", error);
    }

    setEditingId(null); // Exit edit mode
  };

  return (
    <div>
      {todos.todos.map((todo) => (
        <Card key={todo.id} className={classes.card}>
          <CardContent className={classes.cardContent} onClick={() => onEditTodo(todo.id, todo.title)}>
            <Checkbox
              className={classes.checkbox}
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id, todo.completed)}
              color="primary"
            />

            {editingId === todo.id ? (
              <TextField
                className={classes.textField}
                value={editedTitle}
                onChange={handleEditChange}
                autoFocus
                onBlur={() => handleEditSubmit(todo.id)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleEditSubmit(todo.id);
                }}
              />
            ) : (
              <Typography className={classes.title}>{todo.title}</Typography>
            )}
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                deleteTodo({ variables: { where: { id: todo.id } } });
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
