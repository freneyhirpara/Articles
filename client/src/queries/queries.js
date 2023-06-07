import { gql } from '@apollo/client';

const getArticlesQuery = gql`
  query {
    getArticles {
      status
      data {
        _id
        articleName
        category
        likes {
          _id
        }
        comments {
          user {
            firstName
          }
          body
        }
        description
        author {
          firstName
          lastName
          profession
        }
        image
      }
      error
    }
  }
`;

const addArticlesQuery = gql`
  mutation ($name: String!, $category: Category!, $description: String!) {
    createArticle(
      articleName: $name
      category: $category
      description: $description
    ) {
      status
      data {
        _id
        articleName
        category
        likes {
          _id
        }
        author {
          firstName
          lastName
          profession
        }
        description
        image
      }
      error
    }
  }
`;

const editArticlesQuery = gql`
  mutation ($articleId: ID!, $name: String!, $category: Category!, $description: String!) {
    editArticle(
      articleId: $articleId
      articleName: $name
      category: $category
      description: $description
    ) {
      status
      data {
        _id
        articleName
        category
        likes {
          _id
        }
        author {
          firstName
          lastName
          profession
        }
        description
        image
      }
      error
    }
  }
`;

const getArticleByIdQuery = gql`
  query ($id: ID!) {
    getArticle(id: $id) {
      status
      data {
        _id
        articleName
        category
        likes {
          _id
        }
        author {
          firstName
          lastName
          profession
        }
        comments {
          user {
            _id
            firstName
            lastName
            profession
          }
          body
        }
        description
        image
      }
      error
    }
  }
`;

const getArticlesByCategoryQuery = gql`
  query ($category: Category!, $page: Int, $limit: Int) {
    getArticlesByCategory(category: $category, page: $page, limit: $limit) {
      status
      data {
        articles {
          _id
          articleName
          category
          likes {
            _id
          }
          author {
            firstName
            lastName
            profession
          }
          comments {
            user {
              _id
              firstName
              lastName
              profession
            }
            body
          }
          description
          image
        }
        totalArticles
      }
      error
    }
  }
`;

const getAuthorInfoQuery = gql`
  query ($authorId: ID!, $category: Category!, $page: Int, $limit: Int) {
    getAuthorInfo(
      authorId: $authorId
      category: $category
      page: $page
      limit: $limit
    ) {
      status
      data {
        totalArticles
        author {
          _id
          firstName
          lastName
          profession
          articles {
            _id
            articleName
            category
            likes {
              _id
            }
            author {
              firstName
              lastName
              profession
            }
            comments {
              user {
                _id
                firstName
                lastName
                profession
              }
              body
            }
            description
            image
          }
        }
      }
      error
    }
  }
`;

const addCommentQuery = gql`
  mutation ($articleId: ID!, $body: String!) {
    addComment(articleId: $articleId, body: $body) {
      status
      data {
        _id
        comments {
          user {
            _id
            firstName
            lastName
            profession
          }
          body
        }
        author {
          firstName
          lastName
          profession
        }
      }
      error
    }
  }
`;

const addUserQuery = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $profession: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      profession: $profession
      email: $email
      password: $password
    ) {
      status
      data {
        _id
      }
      error
    }
  }
`;

const loginQuery = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      data {
        userId
        token
        tokenExpiration
      }
      error
    }
  }
`;

const toggleLikeQuery = gql`
  mutation ($articleId: ID!) {
    toggleLikes(articleId: $articleId) {
      status
      data {
        _id
        likes {
          _id
        }
      }
      error
    }
  }
`;
export {
  getArticlesQuery,
  addArticlesQuery,
  editArticlesQuery,
  getArticleByIdQuery,
  addUserQuery,
  loginQuery,
  toggleLikeQuery,
  addCommentQuery,
  getArticlesByCategoryQuery,
  getAuthorInfoQuery,
};
