// Liberally adapted from http://redux.js.org/docs/advanced/AsyncActions.html
import { normalize, schema } from 'normalizr';

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'

function requestCategories() {
  //console.log("requestCategories actions")
  return {
    type: REQUEST_CATEGORIES,
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function receiveCategories(json) {
  //console.log("receiveCategories action", json.categories);
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories,
    receivedAt: Date.now()
  }
}

export function fetchCategories() {
 //console.log("fetchCategories");
  return dispatch => {
    dispatch(requestCategories())
    return fetch(`http://localhost:3001/categories`,
      { headers: { 'Authorization': 'whatever-you-want' }}
    )
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(json)))
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'

function requestPosts(category = 'all') {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(category = 'all', normalizedData) {
  //console.log("receivePosts", normalizedData)
  return {
    type: RECEIVE_POSTS,
    category,
    posts: normalizedData.result.posts,
    receivedAt: Date.now()
  }
}

function normalizePosts(json) {
  const data = {posts: json}
  const post = new schema.Entity('posts');
  const mySchema = { posts: [ post ] }
  const normalizedData = normalize(data, mySchema);
  //console.log("normalized data: ", normalizedData)
  return normalizedData;
}

export function fetchPosts(category) {
  //console.log("fetchPosts");
  return dispatch => {
    dispatch(requestPosts(category))
    return fetch(`http://localhost:3001/posts`,
      { headers: { 'Authorization': 'whatever-you-want' }}
    )
    .then(response => response.json())
    .then(json => normalizePosts(json))
    .then(normalizedPosts => {
      dispatch(receivePosts(category, normalizedPosts))
      if (category === 'all'){
        dispatch(receivePostEntities(normalizedPosts))
      }
    })
  }
}

function shouldFetchPosts(state, category) {
  //console.log("shouldFetchPosts", state)
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(category) {
  //console.log('calling fetchPostsIfNeeded')
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export const RECEIVE_POST_ENTITIES = 'RECEIVE_POST_ENTITIES'

export function receivePostEntities(normalizedPosts) {
  //console.log("receivePostEntities", normalizedPosts)
  return {
    type: RECEIVE_POST_ENTITIES,
    posts: normalizedPosts.entities.posts,
    results: normalizedPosts.result.posts
  }
}
