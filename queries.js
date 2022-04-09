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
      notiffreq
      collabId
      notifPending
      notifTime
      email
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
        notiffreq
        collabId
        notifPending
        notifTime
        email
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
        notiffreq
        collabId
        notifPending
        notifTime
        email
        createdAt
        updatedAt
      }
      list {
        id
        createdAt
        updatedAt
      }
      imagePath
      weight
      currWeight
      quantity
      expDate
      createdAt
      updatedAt
      pantryItemsId
      shoppingListItemsId
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
        expDate
        createdAt
        updatedAt
        pantryItemsId
        shoppingListItemsId
      }
      nextToken
    }
  }
`;
export const getShoppingList = /* GraphQL */ `
  query GetShoppingList($id: ID!) {
    getShoppingList(id: $id) {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listShoppingLists = /* GraphQL */ `
  query ListShoppingLists(
    $filter: ModelShoppingListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
