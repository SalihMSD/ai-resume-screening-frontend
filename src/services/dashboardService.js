import api from "../api/axios";

export const getCandidates = () => api.get("/candidates");

export const getJobs = () => api.get("/jobs");

export const getMatches = () => api.get("/matches");

export const getRecentCandidates = () => api.get("/candidates");

export const getRecentJobs = () => api.get("/jobs");
