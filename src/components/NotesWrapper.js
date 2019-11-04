import React, { Component } from 'react';
import Is from 'local-storage';
import uuid from 'uuid';

import Note from './Note';

class NotesWrapper extends Component {
    constructor() {
        super();
        this.state = {
            noteToBeDeletedID: '',
            noteTitle: '',
            noteBody: '',
            notes: []
        }
    }

    componentDidMount() {
        if (Is('NOTES')) {
            const temp = Is('NOTES').map(oldNote => {
                let alteredNote = {
                    key: oldNote.key,
                    id: oldNote.id,
                    title: oldNote.title,
                    body: oldNote.body,
                    editNote: this.editNote,
                    deleteNote: this.deleteNote,
                    toastMessage: this.props.toastMessage
                }

                return alteredNote;
            });

            this.setState({ notes: temp });
        }
    }

    recordNote = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    addNote = (event) => {
        event.preventDefault();

        const { noteTitle, noteBody } = this.state;

        if (this.isNullOrAllSpaces(noteTitle) && this.isNullOrAllSpaces(noteBody)) {
            this.props.toastMessage('Enter some text to add a note.', 'danger');
            return; // Execution ends here.
        }

        // Code for adding a new Note.
        let newNote =
        {
            key: uuid.v4(),
            id: uuid.v4(),
            title: noteTitle,
            body: noteBody,
            editNote: this.editNote,
            deleteNote: this.deleteNote,
            toastMessage: this.props.toastMessage
        }

        let newArr = this.state.notes.map(note => note);
        newArr.push(newNote);

        this.setState({
            notes: newArr
        });

        this.setState({
            noteTitle: '',
            noteBody: ''
        });

        Is('NOTES', newArr); // Update local-storage.

        this.props.toastMessage('Added note successfully.');
    }

    editNote = (id, title, body) => {
        this.setState(prevState => {
            const newNotesArray = prevState.notes.map(note => {

                if (note.id === id) {
                    let editedNote =
                    {
                        key: note.key,
                        id: note.id,
                        title,
                        body,
                        editNote: this.editNote,
                        deleteNote: this.deleteNote,
                        toastMessage: this.props.toastMessage
                    }

                    return editedNote;
                }

                return note;
            })

            Is('NOTES', newNotesArray); // Update local-storage.
            return {
                notes: newNotesArray
            }
        })
    }

    deleteNote = (id, event) => {
        this.setState({ noteToBeDeletedID: id });

        if (event.target.innerHTML === 'Yes') {

            this.setState(prevState => {
                const newNotesArray = prevState.notes.filter(note => note.id !== id);

                Is('NOTES', newNotesArray); // Update local-storage.
                this.props.toastMessage('Note deleted successfully.');

                return {
                    notes: newNotesArray,
                    noteToBeDeletedID: ''
                }
            });
        }
    }

    /* Start of Helper methods. */

    isNullOrAllSpaces = (str = '') => {
        return !str || str.match(/^ *$/);
    }

    /* End of Helper methods. */

    render() {
        let arrayOfNoteComponents = this.state.notes.map(noteObject => {
            return (
                <Note
                    key={noteObject.key}
                    id={noteObject.id}
                    title={noteObject.title}
                    body={noteObject.body}
                    editNote={noteObject.editNote}
                    deleteNote={noteObject.deleteNote}
                    toastMessage={noteObject.toastMessage}
                />
            )
        });

        return (
            <div>
                <div>
                    <form id='addNoteForm' onSubmit={this.addNote}>
                        <div id='addNoteContainer' className="container my-4 py-4">
                            <h4
                                className='text-center'
                                style={{ color: '#009688' }}>
                                Create a new note:
                            </h4>

                            <div className="input-field">
                                <input
                                    type="text"
                                    name="noteTitle"
                                    placeholder='Enter the title of note here...'
                                    className='my-2 pl-2 form-control'
                                    value={this.state.noteTitle}
                                    onChange={this.recordNote}
                                />
                            </div>

                            <div className="input-field">
                                <textarea
                                    name='noteBody'
                                    placeholder='Write your note here...'
                                    className='my-2 pl-2 form-control'
                                    rows='5'
                                    value={this.state.noteBody}
                                    onChange={this.recordNote}
                                />
                            </div>

                            <button
                                className='btn'
                                style={{ backgroundColor: '#26a69a', color: 'white' }}>
                                Add Note
                            </button>
                        </div>
                    </form>
                </div>

                <div className="container-fluid">
                    {arrayOfNoteComponents}
                </div>


                {/* <!-- The Modal --> */}
                <div className="modal" id="myModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Note</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="modal-body text-center">
                                <h6>Are you sure you want to delete this note?</h6>
                                <p><em>(There is no undo.)</em></p>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-danger" data-toggle="modal" data-target="#myModal"
                                        onClick={this.deleteNote.bind(this, this.state.noteToBeDeletedID)}>Yes</button>
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default NotesWrapper;