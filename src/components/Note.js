import React, { Component } from 'react';

class Note extends Component {

  titleHeadingRef
  titleInputRef
  bodyParaRef
  bodyInputRef

  constructor() {
    super()

    this.state = {
      title: '',
      body: '',
      prevTitle: '',
      prevBody: ''
    }

    this.titleHeadingRef = React.createRef();
    this.titleInputRef = React.createRef();
    this.bodyInputRef = React.createRef();
    this.bodyParaRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      body: this.props.body
    })
  }

  recordNote = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  editNote = (event) => {
    const { target } = event;

    const titleHeading = this.titleHeadingRef.current;
    const titleInput = this.titleInputRef.current;
    const bodyPara = this.bodyParaRef.current;
    const bodyInput = this.bodyInputRef.current;

    if (target.innerHTML === 'Edit') {
      target.innerHTML = 'Save';

      this.setState({
        prevTitle: titleInput.value,
        prevBody: bodyInput.innerHTML
      });

      titleHeading.style.display = 'none';
      titleInput.style.display = 'block';

      bodyPara.style.display = 'none';
      bodyInput.style.display = 'block';
    } else {
      target.innerHTML = 'Edit';

      titleHeading.style.display = 'block';
      titleInput.style.display = 'none';

      bodyPara.style.display = 'block';
      bodyInput.style.display = 'none';

      if (bodyInput.innerHTML !== this.state.prevBody || titleInput.value !== this.state.prevTitle) {
        this.props.editNote(this.state.id, this.state.title, this.state.body);
        this.props.toastMessage('Edited note successfully.');
      }
    }
  }

  render() {
    return (
      <div className='card bg-white my-2 shadow-sm'>

        <div className="card-body text-center">

          {/* Elements for showing and editing title */}

          <h3
            ref={this.titleHeadingRef}
            className='card-title'>
            <strong>{this.state.title}</strong>
          </h3>

          <input
            type="text"
            name="title"
            ref={this.titleInputRef}
            className='form-control text-center'
            style={{ display: 'none' }}
            value={this.state.title}
            onChange={this.recordNote}
          />

          {/* Elements for showing and editing body */}

          <p
            ref={this.bodyParaRef}
            className='card-text'
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {this.state.body}
          </p>

          <textarea
            name='body'
            ref={this.bodyInputRef}
            className='my-2 form-control text-center'
            rows='5'
            style={{ display: 'none' }}
            value={this.state.body}
            onChange={this.recordNote}
          />

          <button className="btn" style={{ backgroundColor: '#26a69a' }} onClick={this.editNote}>Edit</button>
          <button className="btn btn-danger" data-toggle="modal" data-target="#myModal"
            onClick={this.props.deleteNote.bind(this, this.state.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Note;
