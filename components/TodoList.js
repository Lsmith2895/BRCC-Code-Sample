import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button, Checkbox } from '@material-ui/core';
// import {useMutation} from '@apollo/react-hooks';
 import todo, {DELETE_TODO, GET_TODOS, UPDATE_TODO} from '../document-nodes/todo';

// NOTE: we typically use TypeScript in our codebase, but for this coding assessment we suggest using JSDoc instead.

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

const TodoList = ({todos}) => {
  const classes = useStyles();

  // TODO: implement deleteTodo mutation
  // TODO: implement updateTodo mutation
  

  return (
    <div>
      {todos.todos.map((todo) => (
        <Card key={todo.id} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Checkbox
              className={classes.checkbox}
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id, !todo.completed)}
              color="primary"
            />
            <Typography className={classes.title}>{todo.title}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="secondary">Delete</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );  
};

export default TodoList;
