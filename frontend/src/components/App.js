import React, {Component} from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import CategoriesList from './CategoriesList';
import {fetchCategories, fetchPostsIfNeeded, fetchAllPosts, selectCategory} from '../actions'
import Posts from './Posts';
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap';
import {denormalize, schema} from 'normalizr';

class App extends Component {
  componentDidMount() {
    const {dispatch, selectedCategory} = this.props
    dispatch(fetchCategories())
    dispatch(fetchAllPosts())
  }

  componentWillReceiveProps(nextProps) {
    //handle route change
    const {dispatch, location} = this.props
    const nextCategory = nextProps.match.params.filter
    if (nextProps.location.pathname !== location.pathname) {
      dispatch(selectCategory(nextCategory))
      dispatch(fetchPostsIfNeeded(nextCategory))
    }
  }

  render() {
    const {categories, posts, entities} = this.props

    //  denormalize posts
    // if (entities.hasOwnProperty('posts') &&  entities.posts.hasOwnProperty('byId')){
    //   const postsById = entities.posts.byId;
    //   const post = new schema.Entity('posts');
    //   const mySchema = { posts: [ post ] }
    //   const postEntities = { posts: postsById };
    //   const denormalizedPosts = denormalize({ posts: entities.posts.allIds}, mySchema, postEntities);
    //   console.log('denormalizedPosts', denormalizedPosts)
    // }
    return (<Grid>
      <Row className="show-grid">
        <Col xs={12}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h2>Welcome to React</h2>
            </div>

            {categories !== "undeclared" && (<CategoriesList list={categories}/>)}
            {posts.length > 0 && entities.posts != null && <Posts posts={posts} />}
          </div>
        </Col>
      </Row>
    </Grid>);
  }
}

App.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {selectedCategory, postsByCategory, categories, entities} = state
  const {isFetching, items: posts} = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
  return {selectedCategory, posts, isFetching, categories: categories, entities}
}

export default connect(mapStateToProps)(App)
