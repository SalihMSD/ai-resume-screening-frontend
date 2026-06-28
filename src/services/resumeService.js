import api from "../api/axios";

export const uploadResume = (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post("/resumes/upload", formData, {

        headers: {
            "Content-Type": "multipart/form-data",
        },

    });

};