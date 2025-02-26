import gql from 'graphql-tag';

// TODO: implement a GET_TODOS query that will be used in the appolloClient
export const GET_TODOS = gql`
query GetTodos {
  todos
}
`;

// TODO: implement a ADD_TODOS mutation that will be used in the appolloClient
export const ADD_TODO = gql`
mutation AddTodo($data: JSON!) {
  createTodo(data: $data) {
    id
    title
    completed
  }
}
`;;

// TODO: implement a DELETE_TODOS mutation that will be used in the appolloClient
export const DELETE_TODO = gql`
mutation DeleteTodo($where: JSON!) {
  deleteTodo(where: $where)
}
`;

// TODO: implement a UPDATE_TODOS mutation that will be used in the appolloClient
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
