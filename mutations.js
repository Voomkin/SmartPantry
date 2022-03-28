/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPantry = /* GraphQL */ `
  mutation CreatePantry(
    $input: CreatePantryInput!
    $condition: ModelPantryConditionInput
  ) {
    createPantry(input: $input, condition: $condition) {
      id
      name
      owner
      items {
        nextToken
      }
      notiffreq
      collabId
      createdAt
      updatedAt
    }
  }
`;
export const updatePantry = /* GraphQL */ `
  mutation UpdatePantry(
    $input: UpdatePantryInput!
    $condition: ModelPantryConditionInput
  ) {
    updatePantry(input: $input, condition: $condition) {
      id
      name
      owner
      items {
        nextToken
      }
      notiffreq
      collabId
      createdAt
      updatedAt
    }
  }
`;
export const deletePantry = /* GraphQL */ `
  mutation DeletePantry(
    $input: DeletePantryInput!
    $condition: ModelPantryConditionInput
  ) {
    deletePantry(input: $input, condition: $condition) {
      id
      name
      owner
      items {
        nextToken
      }
      notiffreq
      collabId
      createdAt
      updatedAt
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      name
      pantry {
        id
        name
        owner
        notiffreq
        collabId
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      name
      pantry {
        id
        name
        owner
        notiffreq
        collabId
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      name
      pantry {
        id
        name
        owner
        notiffreq
        collabId
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
export const createShoppingList = /* GraphQL */ `
  mutation CreateShoppingList(
    $input: CreateShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    createShoppingList(input: $input, condition: $condition) {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateShoppingList = /* GraphQL */ `
  mutation UpdateShoppingList(
    $input: UpdateShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    updateShoppingList(input: $input, condition: $condition) {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteShoppingList = /* GraphQL */ `
  mutation DeleteShoppingList(
    $input: DeleteShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    deleteShoppingList(input: $input, condition: $condition) {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
