import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import {validateEmail} from "../../utils/helper";
import PasswordInput from "../../components/Input/PasswordInput";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault;

        if (!name) {
            setError("Please enter your name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter the password");
        }
        setError("");

        try {
            const response = await axiosInstance.post("/api/auth/register", {
                email: email,
                password: password,
                fullName: name
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message)
            } else {
                setError("An unexpected error occured");
            }
        }
    };

    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignup}>
                        <h4 className="terxt-2xl mb-7">Sign Up</h4>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type="submit" className="btn-primary cursor-pointer">
                            Create Account
                        </button>

                        <p className="text-sm text-center mt-4">
                            Already have an account ?{" "}
                            <Link to="/login" className="font-medium text-blue-600 underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
