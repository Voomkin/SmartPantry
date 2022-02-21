/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePantry = /* GraphQL */ `
  subscription OnCreatePantry {
    onCreatePantry {
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
export const onUpdatePantry = /* GraphQL */ `
  subscription OnUpdatePantry {
    onUpdatePantry {
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
export const onDeletePantry = /* GraphQL */ `
  subscription OnDeletePantry {
    onDeletePantry {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
      quantity
      createdAt
      updatedAt
      pantryItemsId
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
      quantity
      createdAt
      updatedAt
      pantryItemsId
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
      quantity
      createdAt
      updatedAt
      pantryItemsId
    }
  }
`;
