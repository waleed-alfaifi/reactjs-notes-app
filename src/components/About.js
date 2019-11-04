import React from 'react';

function About() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className='card text-center my-5 bg-light'>
                <div className="card-body text-secondary">
                    <p>This app lets you add, edit and delete notes.</p>
                    <em><p>It uses <span className="text-info">local storage</span> of the browser so you won't lose your notes!</p></em>

                    <strong>Made for practice purposes using React.js by <em className='text-primary'>Waleed</em>.</strong>
                </div>
            </div>
        </div>
    )
}

export default About;