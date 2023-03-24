/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      priority
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        priority
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosByPriority = /* GraphQL */ `
  query TodosByPriority(
    $priority: Priority!
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByPriority(
      priority: $priority
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        priority
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosByPriorityAndOwner = /* GraphQL */ `
  query TodosByPriorityAndOwner(
    $priority: Priority!
    $owner: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByPriorityAndOwner(
      priority: $priority
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        priority
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
