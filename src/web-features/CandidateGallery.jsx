import React, { useEffect, useState, useCallback } from 'react';
import axios from '../axios';
import LinearProgress from '../Loaders/LinearProgress';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize handleAccept to avoid re-creating the function on every render
  const handleAccept = useCallback(async (candidateId) => {
    console.log(`Accepted candidate with ID: ${candidateId}`);
    try {
      const response = await axios.put("/candidate", { id: candidateId }, { withCredentials: true });
      console.log(response.data);
      // Remove the accepted candidate from the state
      setCandidates((prevCandidates) => prevCandidates.filter(candidate => candidate._id !== candidateId));
    } catch (error) {
      console.error("Error Accepting Candidate CandidateGallery.jsx:", error);
    }
  }, []);

  // Memoize handleReject to avoid re-creating the function on every render
  const handleReject = useCallback(async (candidateId) => {
    console.log(`Rejected candidate with ID: ${candidateId}`);
    try {
      const response = await axios.delete("/candidate", {
        data: { id: candidateId },
        withCredentials: true
      });
      console.log(response.data);
      // Remove the rejected candidate from the state
      setCandidates((prevCandidates) => prevCandidates.filter(candidate => candidate._id !== candidateId));
    } catch (error) {
      console.error("Error Rejecting Candidate CandidateGallery.jsx:", error);
    }
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/images'); // Adjust URL as needed
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCandidates = async () => {
      try {
        const response = await axios.get('/candidate'); // Adjust URL as needed
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setError(error);
      }
    };

    fetchImages();
    fetchCandidates();
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error loading data: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Candidates List</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {candidates.map((candidate, index) => (
          <div key={candidate._id} className="col">
            <div className="card h-100">
              {images[index] && (
                <img src={`data:image/jpeg;base64,${images[index].data}`} className="card-img-top" alt={candidate.candidateName} />
              )}
              <div className="card-body">
                <h5 className="card-title">{candidate.candidateName}</h5>
                <p className="card-text"><strong>Party:</strong> {candidate.party}</p>
                <p className="card-text"><strong>Voter ID:</strong> {candidate.voterID}</p>
                <p className="card-text"><strong>Gender:</strong> {candidate.gender}</p>
                <p className="card-text"><strong>Created At:</strong> {new Date(candidate.createdAt).toLocaleString()}</p>
                <p className="card-text"><strong>Updated At:</strong> {new Date(candidate.updatedAt).toLocaleString()}</p>
                <button onClick={() => handleAccept(candidate._id)} className="btn btn-success mx-1">Accept</button>
                <button onClick={() => handleReject(candidate._id)} className="btn btn-danger mx-1">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
