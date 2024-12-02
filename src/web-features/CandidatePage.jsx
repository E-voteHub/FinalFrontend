import React, { useEffect, useState } from 'react';
import axios from '../axios';
import LinearProgress from '../Loaders/LinearProgress';

function CandidatePage() {
    const [party, setParty] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [voterID, setVoterID] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const [photo, setPhoto] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData();
        formData.append('party', party);
        formData.append('candidateName', candidateName);
        formData.append('voterID', voterID);
        formData.append('gender', gender);
        formData.append('photo', photo);

        try {
            const response = await axios.post("/candidate/register", formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setMessage(response.data.message);

            if (response.data.photo) {
                setImageUrl(`/image/${response.data.photo}`);
            }
        } catch (error) {
            console.error("CandidatePage error:", error);
            setMessage("An error occurred while registering you!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-3xl font-bold">Register as a Candidate</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="party">
                        Party
                    </label>
                    <input
                        type="text"
                        id="party"
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="candidateName">
                        Candidate Name
                    </label>
                    <input
                        type="text"
                        id="candidateName"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="voterID">
                        Voter ID
                    </label>
                    <input
                        type="text"
                        id="voterID"
                        value={voterID}
                        onChange={(e) => setVoterID(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Gender
                    </label>
                    <div className="flex items-center">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Female</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={gender === 'other'} //Gives true or false
                                onChange={(e) => setGender(e.target.value)}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Other</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <p>In JPEG*</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                        Register
                    </button>
                </div>
                {isLoading && <LinearProgress />}
                {message && <p className="text-center text-green-500 mt-4">{message}</p>}
                {imageUrl && <img src={imageUrl} alt="Uploaded" className="mx-auto mt-4" />}
            </form>
        </div>
    );
}

export default CandidatePage;
