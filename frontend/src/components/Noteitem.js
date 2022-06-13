import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    let context=useContext(noteContext);
    let {deleteNotes}=context;

    const { note,updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center "><h5 className="card-title">{note.title}
                     <i className="far fa-trash-alt mx-2 " onClick={()=>{
                         deleteNotes(note._id);
                     }}></i>
                        <i className="far fa-edit " onClick={()=>{
                         updateNote(note);
                     }}></i> </h5></div>

                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem