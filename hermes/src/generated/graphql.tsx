import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: Scalars['Boolean'];
  addTeamMember: AddMemberResponse;
  createMessage: Scalars['Boolean'];
  createRoom: RoomResponse;
  createTeam: TeamResponse;
  createTeamByTemplate: TeamResponse;
  deleteRoom: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  leaveTeam: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  transferTeam: TransferTeamResponse;
  updateRoom: Room;
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
  roomId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  ann?: InputMaybe<Scalars['Boolean']>;
  dm?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  public: Scalars['Boolean'];
  teamId: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
  public?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateTeamByTemplateArgs = {
  name: Scalars['String'];
  template: Scalars['String'];
};


export type MutationDeleteRoomArgs = {
  roomId: Scalars['Int'];
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


export type MutationUpdateRoomArgs = {
  name: Scalars['String'];
  roomId: Scalars['Int'];
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
  messages: Array<Message>;
  publicTeams: Array<Team>;
  rooms: Array<Room>;
  team?: Maybe<Team>;
  teams: Array<Team>;
  usersToBeFriend: Array<User>;
};


export type QueryGetTeamMembersArgs = {
  teamId: Scalars['ID'];
};


export type QueryMessagesArgs = {
  roomId: Scalars['Int'];
};


export type QueryTeamArgs = {
  teamId: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  ann: Scalars['Boolean'];
  createdAt: Scalars['String'];
  dm: Scalars['Boolean'];
  id: Scalars['Int'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  rules: Scalars['Boolean'];
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
  isAdmin: Scalars['Boolean'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email?: string | null | undefined, createdAt: string, updatedAt: string } | null | undefined };


export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    createdAt
    updatedAt
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