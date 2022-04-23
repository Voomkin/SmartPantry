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
      notifPending
      notifTime
      email
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
      notifPending
      notifTime
      email
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
      notifPending
      notifTime
      email
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
      origQuantity
      expDate
      weight_flag
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
      origQuantity
      expDate
      weight_flag
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
      origQuantity
      expDate
      weight_flag
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
export const createWeightBuffer = /* GraphQL */ `
  mutation CreateWeightBuffer(
    $input: CreateWeightBufferInput!
    $condition: ModelWeightBufferConditionInput
  ) {
    createWeightBuffer(input: $input, condition: $condition) {
      id
      upload_time
      weight_data
      createdAt
      updatedAt
    }
  }
`;
export const updateWeightBuffer = /* GraphQL */ `
  mutation UpdateWeightBuffer(
    $input: UpdateWeightBufferInput!
    $condition: ModelWeightBufferConditionInput
  ) {
    updateWeightBuffer(input: $input, condition: $condition) {
      id
      upload_time
      weight_data
      createdAt
      updatedAt
    }
  }
`;
export const deleteWeightBuffer = /* GraphQL */ `
  mutation DeleteWeightBuffer(
    $input: DeleteWeightBufferInput!
    $condition: ModelWeightBufferConditionInput
  ) {
    deleteWeightBuffer(input: $input, condition: $condition) {
      id
      upload_time
      weight_data
      createdAt
      updatedAt
    }
  }
`;
export const createNewWeight = /* GraphQL */ `
  mutation CreateNewWeight(
    $input: CreateNewWeightInput!
    $condition: ModelNewWeightConditionInput
  ) {
    createNewWeight(input: $input, condition: $condition) {
      id
      upload_time
      weight_data
      createdAt
      updatedAt
    }
  }
`;
export const updateNewWeight = /* GraphQL */ `
  mutation UpdateNewWeight(
    $input: UpdateNewWeightInput!
    $condition: ModelNewWeightConditionInput
  ) {
    updateNewWeight(input: $input, condition: $condition) {
      id
      upload_time
      weight_data
      createdAt
      updatedAt
    }
  }
`;
export const deleteNewWeight = /* GraphQL */ `
  mutation DeleteNewWeight(
    $input: DeleteNewWeightInput!
    $condition: ModelNewWeightConditionInput
  ) {
    deleteNewWeight(input: $input, condition: $condition) {
      id
      upload_time
      weight_data
      createdAt
      updatedAt
    }
  }
`;
