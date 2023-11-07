export const CREATE_USER_MUTATION = `
  mutation createUser($createUserDTO: CreateUserDTO!){
    createUser(payload: $createUserDTO) {
      _id
      name
      email
    }
  }
`;

export const LOGIN = `
  mutation login($createSessionDTO: CreateSessionDTO!){
    login(payload: $createSessionDTO) {
      token
      user{
        _id
        name
        email
      }
    }
  }
`;

export const CUR_USER_QUERY = `
  query {
    getCurUser {
      _id
      name
      email
    }
  }
`;

export const GET_USERS = `
  query {
    getAllusers {
      _id
      name
      email
    }
  }
`;

export const VIEW_USERS = `
query getUser($id: String!){
  getUser(id: $id) {
    _id
    name
    email
  }
}
`;

export const UPDATE_USER_MUTATION = `
  mutation updateUser($updateUserDTO: UpdateUserDTO!) {
    updateUser(payload: $updateUserDTO) 
  }
`;

// export const EDIT_USER = gql`
//   mutation($id: Int, $name: String, $email: String, $job_title: String) {
//     updateUserInfo (id: $id, name: $name, email: $email, job_title: $job_title)
//   }
// `;

export const DELETE_USER = `
  mutation deleteUser($id: String!){
    deleteUser(id:$id)
  }
`;

export const SEARCH_BY_NAME = `
  query GetPersonByName($data: String!) {
    getPersonByName(data: $data) {
      _id
      name
      country
      Description
      image
    }
  }
`;
