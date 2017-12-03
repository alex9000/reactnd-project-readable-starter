import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategoriesList from './CategoriesList';
import { fetchCategories, fetchPostsIfNeeded  } from '../actions'
import PostsList from './PostsList';
import { connect } from 'react-redux'
import { Grid, Row, Col} from 'react-bootstrap';
import { denormalize, schema } from 'normalizr';


class App extends Component {

  componentDidMount() {
   const { dispatch, selectedCategory } = this.props
   dispatch(fetchCategories())
   dispatch(fetchPostsIfNeeded(selectedCategory))
 }

  render() {
    const { categories, entities } = this.props

    // denormalize posts
    if (entities.hasOwnProperty('posts') &&  entities.posts.hasOwnProperty('byId')){
      const postsById = entities.posts.byId;
      const post = new schema.Entity('posts');
      const mySchema = { posts: [ post ] }
      const postEntities = { posts: postsById };
      const denormalizedPosts = denormalize({ posts: entities.posts.allIds}, mySchema, postEntities);
      //console.log('denormalizedPosts', denormalizedPosts)
    }

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        {categories !== "undeclared" && (
                    <CategoriesList
                      list={categories}
                      />)}

        {entities.posts !== null && (
                    <PostsList
                      posts={entities.posts}
        />)}

      </div>
      </Col>
      </Row>
       </Grid>
    );
  }
}

const mapStateToProps = ({ categories, entities, selectedCategory }, ownProps) => {
  return {
    categories: categories,
    entities,
    selectedCategory
  }
}

export default connect(
  mapStateToProps
)(App)
