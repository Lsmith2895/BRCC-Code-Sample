import {makeStyles} from '@material-ui/core';
// import {useMutation} from '@apollo/react-hooks';
 import todo, {DELETE_TODO, GET_TODOS, UPDATE_TODO} from '../document-nodes/todo';

// NOTE: we typically use TypeScript in our codebase, but for this coding assessment we suggest using JSDoc instead.

// TODO: implement styling
const useStyles = makeStyles((theme) => ({}));

// TODO: Update TodoList component to render list items.
const TodoList = ({todos}) => {
  const classes = useStyles();

  // TODO: implement deleteTodo mutation
  // TODO: implement updateTodo mutation
  

  return (
    <div>
      {todos.todos.map((todo =>  {
      return (<div key={todo.id}>
        <div>{todo.title}</div>
        <div>{todo.completed.toString()}</div>
      </div>
      )
    }))}
    </div>
  );
};

export default TodoList;
