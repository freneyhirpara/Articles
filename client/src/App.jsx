import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddArticle from './components/AddArticle/AddArticle';
import EditArticle from './components/EditArticle/EditArticle';
import MyArticles from './components/MyArticles/MyArticles';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import './App.css';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Toast from './components/Toast/Toast';
import { useStateValue } from './context/GlobalState';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const { token } = useStateValue();
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Container className="container">
          <Switch>
            <Route path="/add" exact component={token ? AddArticle : Login} />
            <Route path="/edit/:id" exact component={token ? EditArticle : Login} />
            <Route
              path="/myarticles"
              exact
              component={token ? MyArticles : Login}
            />
            <Route
              path="/article/:id"
              exact
              component={token ? ArticleDetails : Login}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" component={Home} />
          </Switch>
          <Toast />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
