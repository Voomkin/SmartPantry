/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addItem = /* GraphQL */ `
  mutation AddItem(
    $id: ID!
    $name: String
    $description: String
    $weight: Float
    $location: String
  ) {
    addItem(
      id: $id
      name: $name
      description: $description
      weight: $weight
      location: $location
    ) {
      id
      name
      description
      weight
      location
    }
  }
`;
