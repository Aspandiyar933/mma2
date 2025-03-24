import { gql } from "@apollo/client";

export const RECORD_FIGHT = gql`
  mutation RecordFight($input: RecordFightInput!) {
    recordFight(input: $input) {
      id
      winner {
        firstName
        lastName
      }
      method
      round
    }
  }
`;

export const GET_FIGHTERS = gql`
  query GetFighters {
    getFighters {
      id
      firstName
      lastName
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    getAllEvents {
      id
      name
      date
    }
  }
`;