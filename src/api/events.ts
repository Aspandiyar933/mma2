import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetAllEvents {
    getAllEvents {
      id
      name
      location
      date
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      name
      location
      date
    }
  }
`;


export const GET_EVENT_BY_ID = gql`
  query GetEventById($eventId: String!) {
    getEventById(eventId: $eventId) {
      id
      name
      location
      date
      fights {
        id
        method
        round
        fighter1 {
          firstName
          lastName
        }
        fighter2 {
          firstName
          lastName
        }
        winner {
          firstName
          lastName
        }
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: String!) {
    deleteEvent(eventId: $eventId)
  }
`;