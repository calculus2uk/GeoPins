export const ME_QUERY = `{
	me {
	  _id
	  name
	  email
	  picture
	}
  }
`;

export const GET_PINS_QUERY = ` 
{
    getPins {
      _id
      createdAt
      title
      image
      content
      latitude
      longitude
      author {
        _id
        name
        email
        picture
      }
      comments {
        text
        createdAt
        author {
          _id
          name
          picture
        }
      }
    }
  }
  `;

export const DELETE_PIN_MUTATION = `
    mutation($pinId: ID!){
      deletePin(pinId:$pinId){
        _id
      }
    }
  
  `;
