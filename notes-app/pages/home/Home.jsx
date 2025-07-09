import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Notecard from "../../components/Cards/Notecard";
import {MdAdd} from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast.jsx";
import EmptyCard from "../../components/Cards/EmptyCard.jsx";
import AddNotesImg from "../../src/assets/note.png";
import NoDataImg from "../../src/assets/noData.jpg";

export default function Home() {
    const [openAddEditModal, setOpenAddEditModal] = useState({isShown: false,type: "add",data: null,});
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [showToastMsg,setShowToastMsg] = useState({isShown: false,message:"",type:"add"});
    const [isSearch,setIsSearch] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({isShown: true, type: "edit", data: noteDetails});
    };

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/api/user/me");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const handleCloseToast = () => {
        setShowToastMsg({isShown: false,message:""});
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    };

    const showToastMessage = (message,type) => {
        setShowToastMsg({isShown: true,message,type});
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/api/notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (e) {
            console.log(e)
        }
    };

    const deleteNote = async(noteData)=>{
        try{
            const response = await axiosInstance.delete(`/api/notes/${noteData._id}`);
            if(response.data && response.data.message){
                showToastMessage("Note Deleted",'delete');
                getAllNotes();
            }
        }catch(e){
            if(e.response && e.response.data && e.response.data.message){
                console.log("Error", e.response.data.message);
            }
        }
    };

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/api/notes/search", { params: { query: query } });
            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateIsPinned = async(noteData)=>{
        try{
            const response = await axiosInstance.patch(`/api/notes/${noteData._id}/pin`, {"isPinned": !noteData.isPinned});
            if(response.data && response.data.note){
                showToastMessage(response.data.message);
                getAllNotes();
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUserInfo();
        getAllNotes();
        return () => {
        }
    }, [])

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

            <div className="container mx-auto">
                {allNotes.length > 0 ?
                    <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item) => (
                        <Notecard
                            key={item._id}
                            title={item.title}
                            date={moment(item.createdOn).format("DD/MM/YYYY")}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => updateIsPinned(item)}
                        />))}
                    </div> : <EmptyCard imgSrc={isSearch ? NoDataImg : AddNotesImg} message={isSearch ? "Oops! No notes found matching your search":"Start creating your first note! Click the '+' button to jot down your thoughts, ideas, and reminders. Let's get started!"}/>}

                    <button
                        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-700 absolute right-10 bottom-10 cursor-pointer"
                        onClick={() => {
                            setOpenAddEditModal({isShown: true, type: "add", data: null});
                        }}
                    >
                        <MdAdd className="text-[32px] text-white"/>
                    </button>
                    <Modal
                        isOpen={openAddEditModal.isShown}
                        onRequestClose={() => {
                        }}
                        style={{overlay: {backgroundColor: "rgba(0,0,0,0.2)"}}}
                        contentLabel=""
                        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
                    >
                        <AddEditNotes
                            onClose={() =>
                                setOpenAddEditModal({
                                    isShown: false,
                                    type: "add",
                                    data: null,
                                })
                            }
                            type={openAddEditModal.type}
                            noteData={openAddEditModal.data}
                            getAllNotes={getAllNotes}
                            showToastMessage={showToastMessage}
                        />
                    </Modal>
            </div>
            <Toast isShown={showToastMsg.isShown} message={showToastMsg.message} type={showToastMsg.type} onClose={handleCloseToast}/>
        </>

    );
}
