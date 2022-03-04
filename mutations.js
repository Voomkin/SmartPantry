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
