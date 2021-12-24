import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: Scalars['Boolean'];
  addTeamMember: AddMemberResponse;
  createMessage: Scalars['Boolean'];
  createRoom: RoomResponse;
  createTeam: TeamResponse;
  deleteTeam: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  leaveTeam: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  transferTeam: TransferTeamResponse;
  updateTeam: TeamResponse;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAddTeamMemberArgs = {
  teamId: Scalars['ID'];
  username: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  text: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  dm?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  public: Scalars['Boolean'];
  teamId: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
  public?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationTransferTeamArgs = {
  receiverId: Scalars['Int'];
  teamId: Scalars['ID'];
};


export type MutationUpdateTeamArgs = {
  name: Scalars['String'];
  public: Scalars['Boolean'];
  teamId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  getTeamMembers: Array<User>;
  me?: Maybe<User>;
  publicTeams: Array<Team>;
  rooms: Array<Room>;
  team?: Maybe<Team>;
  teams: Array<Team>;
  usersToBeFriend: Array<User>;
};


export type QueryGetTeamMembersArgs = {
  teamId: Scalars['ID'];
};


export type QueryTeamArgs = {
  teamId: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  dm: Scalars['Boolean'];
  id: Scalars['Int'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  teamId: Scalars['String'];
};

export type RoomResponse = {
  __typename?: 'RoomResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
  room?: Maybe<Room>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  rooms: Array<Room>;
  updatedAt: Scalars['String'];
};

export type TeamResponse = {
  __typename?: 'TeamResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export type TransferTeamResponse = {
  __typename?: 'TransferTeamResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  myFriends: Array<User>;
  pictureUrl?: Maybe<Scalars['String']>;
  teams: Array<Team>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type AddMemberResponse = {
  __typename?: 'addMemberResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateTeamMutationVariables = Exact<{
  public: Scalars['Boolean'];
  name: Scalars['String'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'TeamResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, team?: Maybe<{ __typename?: 'Team', id: string, name: string, isPublic: boolean }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email?: Maybe<string>, bio?: Maybe<string>, pictureUrl?: Maybe<string>, teams: Array<{ __typename?: 'Team', id: string, name: string, isPublic: boolean, rooms: Array<{ __typename?: 'Room', id: number, name: string }> }>, myFriends: Array<{ __typename?: 'User', id: number, username: string }> }> };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: string, name: string, isPublic: boolean, createdAt: string, updatedAt: string, rooms: Array<{ __typename?: 'Room', id: number, name: string, public: boolean, teamId: string, createdAt: string }> }> };

export type TeamQueryVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type TeamQuery = { __typename?: 'Query', team?: Maybe<{ __typename?: 'Team', id: string, name: string, createdAt: string, rooms: Array<{ __typename?: 'Room', id: number, name: string, public: boolean, teamId: string, createdAt: string }> }> };


export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($public: Boolean!, $name: String!) {
  createTeam(public: $public, name: $name) {
    ok
    errors {
      field
      message
    }
    team {
      id
      name
      isPublic
    }
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      public: // value for 'public'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    bio
    pictureUrl
    teams {
      id
      name
      rooms {
        id
        name
      }
      isPublic
    }
    myFriends {
      id
      username
      username
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    id
    name
    rooms {
      id
      name
      public
      teamId
      createdAt
    }
    isPublic
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const TeamDocument = gql`
    query Team($teamId: ID!) {
  team(teamId: $teamId) {
    id
    name
    rooms {
      id
      name
      public
      teamId
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;