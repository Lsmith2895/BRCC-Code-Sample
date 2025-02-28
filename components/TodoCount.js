import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
}));

const TodoCount = ({ todos }) => {
  const classes = useStyles();

  const totalTodos = todos.todos.length;
  const completedTodos = todos.todos.filter(todo => todo.completed).length;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.text}>Total: {totalTodos}</Typography>
        <Typography className={classes.text} color="primary">
          Completed: {completedTodos}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TodoCount;
