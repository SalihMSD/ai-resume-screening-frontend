import api from "../api/axios";

export const getCandidates = () => api.get("/candidates");

export const deleteCandidate = (id) =>
  api.delete(`/candidates/${id}`);