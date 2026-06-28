import api from "../api/axios";

export const calculateATS = (candidateId, jobId) => {
  return api.post(`/ats/${candidateId}/${jobId}`);
};