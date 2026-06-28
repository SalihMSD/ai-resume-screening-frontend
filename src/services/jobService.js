import api from "../api/axios";

export const getJobs = () => api.get("/jobs");

export const createJob = (job) => api.post("/jobs", job);

export const deleteJob = (id) => api.delete(`/jobs/${id}`);