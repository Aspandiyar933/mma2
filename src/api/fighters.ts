import { gql } from '@apollo/client';

export const GET_FIGHTERS = gql`
  query GetFighters {
    getFighters {
      id
      firstName
      lastName
      nickname
      weightClass
      wins
      losses
      photoUrl
      bio
    }
  }
`;

export const CREATE_FIGHTER = gql`
  mutation CreateFighter($input: CreateFighterInput!) {
    createFighter(input: $input) {
      id
      firstName
      lastName
      nickname
      weightClass
      wins
      losses
    }
  }
`;

export const UPDATE_FIGHTER = gql`
  mutation UpdateFighter($input: UpdateFighterInput!) {
    updateFighter(input: $input) {
      id
      firstName
      lastName
      bio
      weightClass
      photoUrl
    }
  }
`;