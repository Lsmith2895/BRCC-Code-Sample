import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button, Checkbox } from '@material-ui/core';
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
  },
  checkbox: {
    marginRight: theme.spacing(1),
  },
  cardActions: {
    paddingRight: theme.spacing(2),
  },
}));

const TodoList = ({ todos }) => {
  const classes = useStyles();

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
    refetchQueries: [{ query: GET_TODOS }], // Ensure UI updates in case cache fails
    onError(err) {
      console.error("❌ Apollo Error deleting todo:", err);
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

  return (
    <div>
      {todos.todos.map((todo) => (
        <Card key={todo.id} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Checkbox
              className={classes.checkbox}
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id, todo.completed)}
              color="primary"
            />
            <Typography className={classes.title}>{todo.title}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                deleteTodo({
                  variables: { where: { id: todo.id } }, 
                })
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
