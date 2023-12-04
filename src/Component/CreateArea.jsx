import React, { useContext, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import {theme} from "./App";

function CreateArea(props) {

    const colorTheme = useContext(theme);
    const [inputNote, setInputNote] = useState({ title: "", content: "" });
    const [inputResponse, setInputResponse] = useState(false);

    function handleChange(event) {
        console.log(event.target.value);
        const { value, name } = event.target;

        setInputNote(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });

    }

    return (
        <div onClick={() => {
            setInputResponse(true);
        }}>
            <form className="create-note" action='/home' method="post" style={{backgroundColor: colorTheme.themeColor}}>
                <input
                    onChange={handleChange}
                    name="title"
                    placeholder="Title"
                    value={inputNote.title}
                    style={inputResponse === false ? { display: "none" } : {color: colorTheme.textColor}}
                />
                <textarea
                    onChange={handleChange}
                    name="content"
                    placeholder="Take a note..."
                    rows={inputResponse === false ? 1 : 3}
                    value={inputNote.content}
                    style={{color: colorTheme.textColor}}
                />
                <Zoom in={inputResponse}>
                    <Fab type="button" 
                    style={{background: colorTheme.textColor}}
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    title="Add"
                        onClick={() => {
                            props.addNote(inputNote);
                            setInputNote({ title: "", content: "" });
                        }}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>

        </div>
    );
}

export default CreateArea;