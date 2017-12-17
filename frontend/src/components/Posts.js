import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Posts extends Component {
  render() {
    const {posts, entities} = this.props
    console.log('entities', entities)

    return (
      <div>
      <h3 className='subheader'>
          Posts
        </h3>
        <ul>
      {posts.map((post, i) => <li key={i}>{entities.posts.byId[post].title}</li>)}
    </ul>
  </div>

  )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const {entities} = state
  return {entities}
}

export default connect(mapStateToProps)(Posts)
