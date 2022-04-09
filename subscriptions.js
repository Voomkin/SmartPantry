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
      notiffreq
      collabId
      notifPending
      notifTime
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
      notiffreq
      collabId
      notifPending
      notifTime
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
      notiffreq
      collabId
      notifPending
      notifTime
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
        notiffreq
        collabId
        notifPending
        notifTime
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateShoppingList = /* GraphQL */ `
  subscription OnCreateShoppingList {
    onCreateShoppingList {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShoppingList = /* GraphQL */ `
  subscription OnUpdateShoppingList {
    onUpdateShoppingList {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShoppingList = /* GraphQL */ `
  subscription OnDeleteShoppingList {
    onDeleteShoppingList {
      id
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
