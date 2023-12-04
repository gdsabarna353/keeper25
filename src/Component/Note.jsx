import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import {theme} from "./App";

function Note(props) {
  const colorTheme = useContext(theme);
  const [editing, setEditing] = useState(false);
  const [inputNote, setInputNote] = useState({ title: props.title, content: props.content });
  
  function handleChange(event) {
    // console.log(event.target.value);
    const { value, name } = event.target;
    // console.log(value);
    // console.log(name);

    setInputNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="note" style={{backgroundColor: colorTheme.themeColor}}>
      {editing !== true ? (
        <>
          <h1 style={{color: colorTheme.textColor, fontSize: 1.5 * colorTheme.fontSize + "px"}}>{props.title}</h1>
          <p style={{color: colorTheme.textColor, fontSize: colorTheme.fontSize + "px"}}>{props.content}</p>
          <button style={{color: colorTheme.textColor}}
        type="button"
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="Delete"
        onClick={() => {
          props.deleteNote(props.id);
        }}
      >
        <DeleteIcon />
      </button>
      <button style={{color: colorTheme.textColor}}
        type="button"
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="Edit"
        onClick={() => {
          setEditing(true);
          // props.editNote(props.id);
        }}
      >
        <EditIcon />
      </button>
        </>
      ) : (
        <>
          <input style={{color: colorTheme.textColor}} type="text" name="title" value={inputNote.title} placeholder="Title" onChange={handleChange}/>
          <input style={{color: colorTheme.textColor}} type="text" name="content" value={inputNote.content} placeholder="Take a note..." onChange={handleChange}/>
          <button style={{color: colorTheme.textColor}}
        type="button"
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="Close"
        onClick={() => {
          // props.deleteNote(props.id);
          setEditing(false);
        }}
      >
        <ClearIcon/>
      </button>
      <button style={{color: colorTheme.textColor}}
        type="button"
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="Save"
        onClick={() => {
          setEditing(false);
          props.editNote(props.id, inputNote);
        }}
      >
        <SaveIcon/>
      </button>
        </>
      )}

      
    </div>
  );
}

export default Note;
