import axios from "axios";

export class ApiRepository {
    async GetAllBlog(pageNumber, pageSize, sort = "") {
        try {
            const response = await axios.get("https://suitmedia-backend.suitdev.com/api/ideas", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                params: {
                    "page[number]": pageNumber,
                    "page[size]": pageSize,
                    "append[]": ["medium_image"],
                    sort: sort 
                }
            })

            console.log("Response data :", response.data);
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error saat fetch api suitmedia", error.response.data || error.message)
                throw error.response.data
            } else {
                console.error("Internal server 500 error", error)
                throw Error("Internal server 500 error")
            }
        }
    }
}