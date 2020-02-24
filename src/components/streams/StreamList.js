import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { fetchStreams } from '../../actions'; 

class StreamList extends Component {
  componentDidMount () {
    this.props.fetchStreams(); 
  }

  renderAdminButtons (stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderCreate () {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      ); 
    }
  }

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>

          {this.renderAdminButtons(stream)}

          <i className="large middle aligned icon camera"></i>

          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">
              {stream.description}
            </div>
          </div>
         
        </div>
      ); 
    });
  }

 

  render () {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    ); 
  }  
}

const mapStateToProps = state => {
  // Object.values is a built in JS function that takes an object as an argument 
  // all the values inside that object will be taken out & put into an array
  // the result will be an array of objects 
  return { 
    streams : Object.values(state.streams), 
    currentUserId: state.auth.userId, 
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect (mapStateToProps, { fetchStreams })(StreamList);