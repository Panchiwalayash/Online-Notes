import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host="http://localhost:5000"
    const notesInitial=[];
    const [notes,setNotes]=useState(notesInitial)
    
    // get notes
    const getNotes=async()=>{
      // console.log("we are in getnotes");
      const response = await fetch(`http://localhost:5000/api/notes/fetchallnoted`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authToken":localStorage.getItem('token')
        }
      });
     let json=await response.json();
    //  console.log(json)
     setNotes(json);
    }

    // adding notes
    const addNote=async(title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authToken":localStorage.getItem('token')
        }, 
        body: JSON.stringify({title,description,tag})
      });
      let json= await response.json()
     console.log(json)
      
      setNotes(notes.concat(json)); 
    }

    // deleting notes
    const deleteNotes=async(noteid)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${noteid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "authToken":localStorage.getItem('token')
        }
      });
        // console.log("we are deleting note of id "+id);
        let noteindex=notes.filter(note=>{
          if (note._id!==noteid) {
            console.log("in deleting note");
            return note;
          }
        })
        setNotes(noteindex)
    }

    //editing note
    const editNote=async(id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authToken":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      let json =response.json();
      let newNotes=JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];

        if (element._id===id) {
          console.log("we are editing note");
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
        // console.log(newNotes);
      }
      setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes,getNotes,addNote,deleteNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;



