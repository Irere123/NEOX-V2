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

export type FriendResponse = {
  __typename?: 'FriendResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
};

export type GlobalResponse = {
  __typename?: 'GlobalResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
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
  addFriend: FriendResponse;
  addTeamMember: AddMemberResponse;
  createMessage: Scalars['Boolean'];
  createRequest: GlobalResponse;
  createRoom: RoomResponse;
  createTeam: TeamResponse;
  createTeamByTemplate: TeamResponse;
  deleteAcceptedRequest: GlobalResponse;
  deleteCanceledRequest: GlobalResponse;
  deleteRoom: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  leaveTeam: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  transferTeam: TransferTeamResponse;
  updateAcceptRequest: GlobalResponse;
  updateCancelRequest: GlobalResponse;
  updateRoom: Room;
  updateTeam: TeamResponse;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAddTeamMemberArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  roomId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationCreateRequestArgs = {
  receiverId: Scalars['Float'];
};


export type MutationCreateRoomArgs = {
  ann?: Maybe<Scalars['Boolean']>;
  dm?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  public: Scalars['Boolean'];
  teamId: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
  public?: Maybe<Scalars['Boolean']>;
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


export type MutationUpdateAcceptRequestArgs = {
  id: Scalars['Int'];
  value: Scalars['Boolean'];
};


export type MutationUpdateCancelRequestArgs = {
  id: Scalars['Int'];
  value: Scalars['Boolean'];
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
  requests: Array<Request>;
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

export type Request = {
  __typename?: 'Request';
  accepted: Scalars['Boolean'];
  canceled: Scalars['Boolean'];
  id: Scalars['Float'];
  isSender: Scalars['Boolean'];
  receiver: User;
  receiverId: Scalars['Float'];
  sender: User;
  senderId: Scalars['Float'];
};

export type Room = {
  __typename?: 'Room';
  ann: Scalars['Boolean'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
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


export type SubscriptionNewMessageArgs = {
  roomId: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  admin: User;
  createdAt: Scalars['String'];
  description: Scalars['String'];
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
  nameTag: Scalars['String'];
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

export type CreateChannelMutationVariables = Exact<{
  teamId: Scalars['ID'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  ann: Scalars['Boolean'];
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'RoomResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, room?: Maybe<{ __typename?: 'Room', id: number, name: string, public: boolean, ann: boolean, createdAt: string }> } };

export type AddFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'FriendResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateMessageMutationVariables = Exact<{
  roomId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: boolean };

export type UpdateAcceptReqMutationVariables = Exact<{
  id: Scalars['Int'];
  value: Scalars['Boolean'];
}>;


export type UpdateAcceptReqMutation = { __typename?: 'Mutation', updateAcceptRequest: { __typename?: 'GlobalResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UpdateCancelReqMutationVariables = Exact<{
  id: Scalars['Int'];
  value: Scalars['Boolean'];
}>;


export type UpdateCancelReqMutation = { __typename?: 'Mutation', updateCancelRequest: { __typename?: 'GlobalResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type CreateTeamMutationVariables = Exact<{
  public: Scalars['Boolean'];
  name: Scalars['String'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'TeamResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, team?: Maybe<{ __typename?: 'Team', id: string, name: string, isPublic: boolean }> } };

export type CreateTeamByTemplateMutationVariables = Exact<{
  name: Scalars['String'];
  template: Scalars['String'];
}>;


export type CreateTeamByTemplateMutation = { __typename?: 'Mutation', createTeamByTemplate: { __typename?: 'TeamResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, team?: Maybe<{ __typename?: 'Team', id: string, name: string, isPublic: boolean }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email?: Maybe<string>, bio?: Maybe<string>, pictureUrl?: Maybe<string>, teams: Array<{ __typename?: 'Team', id: string, name: string, isPublic: boolean, rooms: Array<{ __typename?: 'Room', id: number, name: string }> }>, myFriends: Array<{ __typename?: 'User', id: number, username: string, bio?: Maybe<string>, pictureUrl?: Maybe<string> }> }> };

export type MessagesQueryVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, username: string, pictureUrl?: Maybe<string> } }> };

export type RequestQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'Request', id: number, accepted: boolean, receiverId: number, senderId: number, isSender: boolean, sender: { __typename?: 'User', id: number, username: string, pictureUrl?: Maybe<string> }, receiver: { __typename?: 'User', id: number, username: string, pictureUrl?: Maybe<string> } }> };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: string, name: string, isAdmin: boolean, isPublic: boolean, createdAt: string, updatedAt: string, rooms: Array<{ __typename?: 'Room', id: number, name: string, public: boolean, teamId: string, createdAt: string }> }> };

export type TeamQueryVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type TeamQuery = { __typename?: 'Query', team?: Maybe<{ __typename?: 'Team', id: string, name: string, isAdmin: boolean, createdAt: string, rooms: Array<{ __typename?: 'Room', id: number, name: string, ann: boolean, rules: boolean, public: boolean, teamId: string, createdAt: string }> }> };

export type TeamMembersQueryVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type TeamMembersQuery = { __typename?: 'Query', getTeamMembers: Array<{ __typename?: 'User', id: number, username: string, pictureUrl?: Maybe<string>, teams: Array<{ __typename?: 'Team', isAdmin: boolean }> }> };

export type MessageSubscriptionVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type MessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, username: string, pictureUrl?: Maybe<string> } } };


export const CreateChannelDocument = gql`
    mutation CreateChannel($teamId: ID!, $name: String!, $public: Boolean!, $ann: Boolean!) {
  createRoom(teamId: $teamId, name: $name, public: $public, ann: $ann) {
    ok
    errors {
      field
      message
    }
    room {
      id
      name
      public
      ann
      createdAt
    }
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      name: // value for 'name'
 *      public: // value for 'public'
 *      ann: // value for 'ann'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($friendId: Int!) {
  addFriend(friendId: $friendId) {
    ok
    errors {
      field
      message
    }
  }
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
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
export const CreateMessageDocument = gql`
    mutation CreateMessage($roomId: Int!, $text: String!) {
  createMessage(text: $text, roomId: $roomId)
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const UpdateAcceptReqDocument = gql`
    mutation UpdateAcceptReq($id: Int!, $value: Boolean!) {
  updateAcceptRequest(id: $id, value: $value) {
    ok
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateAcceptReqMutationFn = Apollo.MutationFunction<UpdateAcceptReqMutation, UpdateAcceptReqMutationVariables>;

/**
 * __useUpdateAcceptReqMutation__
 *
 * To run a mutation, you first call `useUpdateAcceptReqMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAcceptReqMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAcceptReqMutation, { data, loading, error }] = useUpdateAcceptReqMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateAcceptReqMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAcceptReqMutation, UpdateAcceptReqMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAcceptReqMutation, UpdateAcceptReqMutationVariables>(UpdateAcceptReqDocument, options);
      }
export type UpdateAcceptReqMutationHookResult = ReturnType<typeof useUpdateAcceptReqMutation>;
export type UpdateAcceptReqMutationResult = Apollo.MutationResult<UpdateAcceptReqMutation>;
export type UpdateAcceptReqMutationOptions = Apollo.BaseMutationOptions<UpdateAcceptReqMutation, UpdateAcceptReqMutationVariables>;
export const UpdateCancelReqDocument = gql`
    mutation UpdateCancelReq($id: Int!, $value: Boolean!) {
  updateCancelRequest(id: $id, value: $value) {
    ok
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateCancelReqMutationFn = Apollo.MutationFunction<UpdateCancelReqMutation, UpdateCancelReqMutationVariables>;

/**
 * __useUpdateCancelReqMutation__
 *
 * To run a mutation, you first call `useUpdateCancelReqMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCancelReqMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCancelReqMutation, { data, loading, error }] = useUpdateCancelReqMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateCancelReqMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCancelReqMutation, UpdateCancelReqMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCancelReqMutation, UpdateCancelReqMutationVariables>(UpdateCancelReqDocument, options);
      }
export type UpdateCancelReqMutationHookResult = ReturnType<typeof useUpdateCancelReqMutation>;
export type UpdateCancelReqMutationResult = Apollo.MutationResult<UpdateCancelReqMutation>;
export type UpdateCancelReqMutationOptions = Apollo.BaseMutationOptions<UpdateCancelReqMutation, UpdateCancelReqMutationVariables>;
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
export const CreateTeamByTemplateDocument = gql`
    mutation CreateTeamByTemplate($name: String!, $template: String!) {
  createTeamByTemplate(name: $name, template: $template) {
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
export type CreateTeamByTemplateMutationFn = Apollo.MutationFunction<CreateTeamByTemplateMutation, CreateTeamByTemplateMutationVariables>;

/**
 * __useCreateTeamByTemplateMutation__
 *
 * To run a mutation, you first call `useCreateTeamByTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamByTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamByTemplateMutation, { data, loading, error }] = useCreateTeamByTemplateMutation({
 *   variables: {
 *      name: // value for 'name'
 *      template: // value for 'template'
 *   },
 * });
 */
export function useCreateTeamByTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamByTemplateMutation, CreateTeamByTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamByTemplateMutation, CreateTeamByTemplateMutationVariables>(CreateTeamByTemplateDocument, options);
      }
export type CreateTeamByTemplateMutationHookResult = ReturnType<typeof useCreateTeamByTemplateMutation>;
export type CreateTeamByTemplateMutationResult = Apollo.MutationResult<CreateTeamByTemplateMutation>;
export type CreateTeamByTemplateMutationOptions = Apollo.BaseMutationOptions<CreateTeamByTemplateMutation, CreateTeamByTemplateMutationVariables>;
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
      bio
      pictureUrl
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
export const MessagesDocument = gql`
    query Messages($roomId: Int!) {
  messages(roomId: $roomId) {
    id
    text
    createdAt
    updatedAt
    user {
      id
      username
      pictureUrl
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const RequestDocument = gql`
    query Request {
  requests {
    id
    accepted
    receiverId
    senderId
    isSender
    sender {
      id
      username
      pictureUrl
    }
    receiver {
      id
      username
      pictureUrl
    }
  }
}
    `;

/**
 * __useRequestQuery__
 *
 * To run a query within a React component, call `useRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestQuery(baseOptions?: Apollo.QueryHookOptions<RequestQuery, RequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestQuery, RequestQueryVariables>(RequestDocument, options);
      }
export function useRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestQuery, RequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestQuery, RequestQueryVariables>(RequestDocument, options);
        }
export type RequestQueryHookResult = ReturnType<typeof useRequestQuery>;
export type RequestLazyQueryHookResult = ReturnType<typeof useRequestLazyQuery>;
export type RequestQueryResult = Apollo.QueryResult<RequestQuery, RequestQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    id
    name
    isAdmin
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
    isAdmin
    rooms {
      id
      name
      ann
      rules
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
export const TeamMembersDocument = gql`
    query TeamMembers($teamId: ID!) {
  getTeamMembers(teamId: $teamId) {
    id
    username
    pictureUrl
    teams {
      isAdmin
    }
  }
}
    `;

/**
 * __useTeamMembersQuery__
 *
 * To run a query within a React component, call `useTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamMembersQuery(baseOptions: Apollo.QueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
      }
export function useTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
        }
export type TeamMembersQueryHookResult = ReturnType<typeof useTeamMembersQuery>;
export type TeamMembersLazyQueryHookResult = ReturnType<typeof useTeamMembersLazyQuery>;
export type TeamMembersQueryResult = Apollo.QueryResult<TeamMembersQuery, TeamMembersQueryVariables>;
export const MessageDocument = gql`
    subscription Message($roomId: Int!) {
  newMessage(roomId: $roomId) {
    id
    text
    createdAt
    updatedAt
    user {
      id
      username
      pictureUrl
    }
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, options);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;