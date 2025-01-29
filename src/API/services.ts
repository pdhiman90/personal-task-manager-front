import axios from 'axios';




// export const signup = async (payload:any) => {
//     try {
//     let data = JSON.stringify({
//         "username": payload.username,
//         "email": payload.email,
//         "password": payload.password
//     });
// console.log(data);
//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'http://localhost:3000/signup',
//         headers: {
//             contentType: 'application/json'
//             // 'Authorization': `Bearer ${token}`
//         },
//         data: data
//     };

//     const response = await axios.request(config)
//     console.log(JSON.stringify(response.data));
//     // .then((response) => {
//     // })
//     // .catch((error) => {
//     //   console.log(error);
//     // });
//     console.log(JSON.stringify(response.data));
//     return JSON.stringify(response.data);
// }
// catch (error:any) {
//     console.log(error);
//     throw new Error(error);
// }
// }


// import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL

export const signup = async (payload:any) => {
    try {
        // Prepare data
        const data = {
            "username": payload.username,
            "email": payload.email,
            "password": payload.password,
        };

        console.log("Request Payload:", data);

        // Config for Axios request
        const config = {
            method: 'post',
            url: `${api_url}/signup`, // Ensure this URL matches your backend
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        // Make the request
        const response = await axios(config);

        console.log("Response Data:", response.data.token);

        // Return response data
        return response.data;
    } catch (error:any) {
        // Handle Axios errors
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error("Server Error:", error.response.data);
            throw new Error(error.response.data.message || "Server error occurred.");
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
            throw new Error("No response from server. Please try again later.");
        } else {
            // Something else happened during the request setup
            console.error("Axios Error:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }
};


export const login = async (payload:any) => {
    try {
        // Prepare data
        const data = {
            "email": payload.email,
            "password": payload.password,
        };

        console.log("Request Payload:", data);

        // Config for Axios request
        const config = {    
            method: 'post',
            url: `${api_url}/login`, // Ensure this URL matches your backend
            headers: {    
                'Content-Type': 'application/json',
            },
            data: data,
        };

        // Make the request
        const response = await axios(config);

        console.log("Response Data:", response.data.token);

        // Return response data 
        return response.data;
    } catch (error:any) {    
        // Handle Axios errors
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error("Server Error:", error.response.data);
            throw new Error(error.response.data.message || "Server error occurred.");
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
            throw new Error("No response from server. Please try again later.");
        } else {
            // Something else happened during the request setup
            console.error("Axios Error:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }
};



export const addTasks = async(payload:any,token:any)=>{

    try {
        let data = JSON.stringify({
            "title": payload.title,
            "description": payload.description,
            "dueDate": payload.dueDate,
            "priority": payload.priority,
            "category": payload.category,
            "user": payload.user,
            "completed": payload.completed||false
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api_url}/api/create`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            data : data
          };
          
         const response = await axios.request(config)
         console.log(JSON.stringify(response.data));
         return response;
          
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = async (id:any,completed:any,token:any)=>{
    try{
let data = JSON.stringify({
  "completed": completed
});
console.log(data,"data");

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${api_url}/api/update/${id}`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${token}`
  },
  data : data
};

const response = await axios.request(config)
if(response){
    return response;
}
return [];
    }
    catch (error:any) {
        console.log(error);
        throw new Error(error);
    }

}


export const AllTasks = async(token:any)=>{
    try{

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${api_url}/api/allTasks`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${token}`
  }
};

const response = await axios.request(config)
return response;
    }
    catch (error:any) {
        console.log(error);
        throw new Error(error);
    }


}


export const deleteTask = async(id:any,token:any)=>{


let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: `${api_url}/api/delete/${id}`,
  headers: { 
    'Authorization': `Bearer ${token}`
  }
};

const response = await axios.request(config)
return response;


}




