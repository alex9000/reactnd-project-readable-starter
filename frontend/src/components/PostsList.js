import React from 'react';
//import { capitalize } from '../utils/helpers';
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem} from 'react-bootstrap';

export default function PostsList ({ posts }) {
  return (
    <div className='posts-list'>
      <h3 className='subheader'>
        Posts
      </h3>
      <ListGroup>
        {posts !== undefined && posts.allIds.map(id => (
          <ListGroupItem key={id}>
            {posts.byId[id].title} - Votes: {posts.byId[id].voteScore}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}

PostsList.propTypes = {
  posts: PropTypes.object
}
