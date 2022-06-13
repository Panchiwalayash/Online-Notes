import { React, useContext, useEffect, useRef,useState } from 'react';
import { useHistory } from 'react-router-dom';

import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


function Notes() {
  const context = useContext(noteContext);
  const history=useHistory();
  // here we had did destructuring of props
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      // console.log("getting notes");
      getNotes();
      // react-hooks/exhaustive-deps
    }
    else{
      history.push('/login');
    }
  },[]);


  // console.log("Notes are: " + notes);
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    // console.log(ref.current);
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const refClose = useRef(null);



    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
        
    }
    const handleClick=(e)=>{
        e.preventDefault();
        refClose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag)
      
    }
    
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
            </div>            
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <h2>your Notes</h2>
          <div className="container font-weight-bold">
            {(notes.length===0)&& `There is no Note, so plz add Note to view`}
          </div>
          <div className="row">
            {notes.map((note) => {
              return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })

            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes; 
