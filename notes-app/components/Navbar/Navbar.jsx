import React, {useState} from "react";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import {useNavigate, useLocation} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({userInfo,onSearchNote,handleClearSearch}) {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const onLogout = () => {
        navigate("/welcome");
        localStorage.clear();
    };

    const handleSearch = () => {
        if(searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2 cursor-pointer" onClick={() => navigate('/')}>Notes</h2>
            {userInfo && (
                <SearchBar
                    value={searchQuery}
                    onChange={({target}) => {
                        setSearchQuery(target.value);
                    }}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            )}
            {userInfo ? (
                <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
            ) : (
                location.pathname !== '/login' && (
                    <button
                        className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                        onClick={() => navigate('/login')}
                    >
                        Giriş
                    </button>
                )
            )}
        </div>
    );
}

export default Navbar;
