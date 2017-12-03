import { combineReducers } from 'redux'

import {
  SELECT_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_POST_ENTITIES
} from '../actions'

function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return state
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
          isFetching: true
        })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

function entities(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST_ENTITIES:
    return Object.assign({}, state, {
      posts: {
        byId: action.posts,
        allIds: action.results
        }
    })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory,
  categories,
  entities
})

export default rootReducer
