import React from "react";
import { Link } from 'react-router-dom';

function Header() {
    const style = {
        backgroundColor: '#b2dfdb',
        color: 'black'
    }
    return (
        <div >
            <nav className='text-center' style={{backgroundColor: '#009688', padding: '10px'}}>
                <div className="btn-group">
                    <Link className='btn' to='/' style={style}>Home</Link>
                    <Link className='btn' to='/about' style={style}>About</Link>
                </div>
            </nav>

        </div>
    )
}

export default Header;