import React, { Component } from 'react'; 
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
          <button className="ui button primary">Edit</button>
          <button className="ui button negative">Delete</button>
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
            {stream.title}
            <div className="description">
              {stream.description}
            </div>
          </div>
         
        </div>
      ); 
    });
  }

  render () {
    console.log(this.props.streams)
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        
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
    currentUserId: state.auth.userId 
  }
}

export default connect (mapStateToProps, { fetchStreams })(StreamList);