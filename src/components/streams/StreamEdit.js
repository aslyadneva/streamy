import React, { Component } from 'react'; 
import StreamForm from './StreamForm'; 
import { connect } from 'react-redux'; 
import { fetchStream, editStream } from '../../actions'; 

class StreamEdit extends Component {
  componentDidMount () {
    this.props.fetchStream(this.props.match.params.id); 
  }

  //Callback for StreamForm
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues); 
  }

  render () {
    if (!this.props.stream) {
      return (<div>Loading...</div>)
    }

    return (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm 
          initialValues={{ title: this.props.stream.title, description: this.props.stream.description }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);