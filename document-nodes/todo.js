import gql from 'graphql-tag';

export const GET_TODOS = gql`
query GetTodos {
  todos {
    id
    title
    completed
  }
}
`;

export const ADD_TODO = gql`
mutation AddTodo($data: JSON!) {
  createTodo(data: $data) {
    id
    title
    completed
  }
}
`;

export const DELETE_TODO = gql`
mutation DeleteTodo($where: JSON!) {
  deleteTodo(where: $where)
}
`;

export const UPDATE_TODO = gql`
mutation UpdateTodo($values: JSON!, $options: JSON!) {
  updateTodo(values: $values, options: $options) {
    id
    title
    completed
  }
}
`;

export default {
    GET_TODOS,
    DELETE_TODO,
    ADD_TODO,
    UPDATE_TODO,
};
