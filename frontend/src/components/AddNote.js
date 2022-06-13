import { React, useContext,useState} from 'react';

import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);

    // here we had did destructuring of props
    const { addNote } = context;

    const [note, setnote] = useState({title:"",description:"",tag:""});

    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
        
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title:"",description:"",tag:""});
    }
    

    return( 
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} />
            </div>
            
            <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
    )
};

export default Addnote;
