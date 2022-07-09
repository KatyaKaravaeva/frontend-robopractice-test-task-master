import axios from "axios";

export const data = {
    fetchData: async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/users/');
            return response.data
        }
        catch(e){
            console.log(e)
        }
    }
}