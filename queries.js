/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPantry = /* GraphQL */ `
  query GetPantry($id: ID!) {
    getPantry(id: $id) {
      id
      name
      owner
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPantries = /* GraphQL */ `
  query ListPantries(
    $filter: ModelPantryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPantries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      pantry {
        id
        name
        owner
        createdAt
        updatedAt
      }
      imagePath
      weight
      currWeight
      quantity
      createdAt
      updatedAt
      pantryItemsId
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imagePath
        weight
        currWeight
        quantity
        createdAt
        updatedAt
        pantryItemsId
      }
      nextToken
    }
  }
`;
