import api from "../api/axios";

export const getAllMatches = () => {
  return api.get("/matches");
};

export const deleteMatch = (id) => {
  return api.delete(`/matches/${id}`);
};