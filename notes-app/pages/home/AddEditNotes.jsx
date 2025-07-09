import React, {useState} from "react";
import TagInput from "../../components/Input/TagInput";
import {MdClose} from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance.js";

const AddEditNotes = ({type, onClose,getAllNotes,noteData,showToastMessage}) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || "");
    const [error, setError] = useState(null);


    const addNewNote=async()=>{
        try {
            const response = await axiosInstance.post("/api/notes",{title,content,tags});

            if(response.data && response.data.note){
                showToastMessage(response.data.message);
                getAllNotes()
                onClose()
            }
        }catch(e){
            if(e.response && e.response.data && e.response.data.message){
                setError(e.response.data.message);
            }
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }
        if (!content) {
            setError("Please Enter the content");
            return;
        }
        setError("");

        if (type === "edit") {
              editNote();
        } else {
              addNewNote();
        }
    };

    const editNote = async () =>{
        try{
            const response = await axiosInstance.put(`/api/notes/${noteData._id}`,{title,content,tags});
            if(response.data && !response.data.error){
                showToastMessage(response.data.message);
                getAllNotes();
                onClose();
            }
        }catch(e){
            if(e.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 "
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400"/>
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Go To Gym At 5"
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                ></input>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Content</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>
            <div className="mt-3">
                <label className="input-label">Tags</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            <button
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleAddNote}
            >
                {type === "edit" ? "Update" : "Add"}
            </button>
        </div>
    );
};

export default AddEditNotes;
