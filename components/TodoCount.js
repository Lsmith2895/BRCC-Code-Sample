import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '12px',
    margin: theme.spacing(2),
    borderRadius: 8,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  textLeft: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  textRight: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: theme.palette.primary.main,
  },
}));

const TodoCount = ({ todos }) => {
  const classes = useStyles();

  const totalTodos = todos.todos.length;
  const completedTodos = todos.todos.filter(todo => todo.completed).length;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.textLeft}>Total: {totalTodos}</Typography>
        <Typography className={classes.textRight}>Completed: {completedTodos}</Typography>
      </CardContent>
    </Card>
  );
};

export default TodoCount;
