import React from 'react';
import { capitalize } from '../utils/helpers';
import FilterLink from './FilterLink'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem} from 'react-bootstrap';


export default function CategoriesList ({ list }) {
  return (
    <div className='categories-list'>
      <h3 className='subheader'>
        Categories
      </h3>
      <ListGroup>
        <ListGroupItem key='all'>
          <FilterLink filter="all">All</FilterLink>
        </ListGroupItem>
        {list.map((list) => (
          <ListGroupItem key={list.path}>
            <FilterLink filter={list.name}>{capitalize(list.name)}</FilterLink>
          </ListGroupItem>
        ))}
    </ListGroup>
    </div>
  )
}


CategoriesList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
