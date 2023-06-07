import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Article {
        _id: ID
        articleName: String!
        category: Category!
        author: Author
        description: String!
        likes: [Like]
        image: String
        comments: [Comment]
    }
    
    type Comment {
        user: Author
        body: String,
    }

    type Like {
        _id: ID
    }
    enum Category {
        Technology
        Research
        Gaming
        Entertainment
        Food
        All
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        profession: String
        email: String
        password: String
    }

    type Author {
        _id: ID
        firstName: String
        lastName: String
        profession: String
        articles: [Article]
    }

    type getArticlesResponse {
        status: String
        data: [Article]
        error: String
    }
    type getArticleResponse {
        status: String
        data: Article
        error: String
    }
    type getAuthorInfoResponse {
        status: String
        data: getAuthorAndPaginateResponse
        error: String
    }

    type getAuthorAndPaginateResponse{
       author: Author
       totalArticles: Int
    }

    type getArticlesAndPaginateResponse {
        articles: [Article]
        totalArticles: Int
    }

    type getArticlesByCategoryResponse {
        status: String
        data: getArticlesAndPaginateResponse
        error: String
    }

    type toggleLikesResponse {
        status: String
        data: Article
        error: String
    }

    type addCommentsResponse {
        status: String
        data: Article
        error: String
    }

    type loginResponse {
        status: String
        data: LoginData
        error: String
    }

    type createUserResponse {
        status: String
        data: User
        error: String
    }

    type createArticleResponse {
        status: String
        data: Article
        error: String
    }

    type editArticleResponse {
        status: String
        data: Article
        error: String
    }

    type deleteArticleResponse {
        status: String
        data: ID!
        error: String
    }

    type Query {
        getArticle(id: ID): getArticleResponse
        getArticles: getArticlesResponse
        getAuthorInfo(authorId: ID, category: Category!, page: Int, limit: Int): getAuthorInfoResponse
        getArticlesByCategory(category: Category!, page: Int, limit: Int): getArticlesByCategoryResponse
    }

    type LoginData {
        userId: ID
        token: String
        tokenExpiration: Int 
    }

    type Mutation {
        createArticle(
            articleName: String!,
            category: Category!,
            description: String!): createArticleResponse

        deleteArticle(
            id: ID!
        ): deleteArticleResponse

        editArticle(
            articleId: ID!,
            articleName: String,
            category: Category,
            description: String): editArticleResponse
        
        createUser(
            firstName: String!,
            lastName: String!,
            profession: String,
            email: String!,
            password: String!): createUserResponse
        
        login(
            email: String,
            password: String
        ): loginResponse

        toggleLikes(
            articleId: ID!,
        ): toggleLikesResponse

        addComment(
            articleId: ID!,
            body: String
        ): addCommentsResponse
    }
`);

export default schema;
