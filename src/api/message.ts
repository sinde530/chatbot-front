/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import FormData from 'form-data';

// export async function sendMessage(data: FormData) {
//     try {
//         const response = await axios.post('http://localhost:8080/chat', data, {
//             headers: data.getHeaders(),
//         });
//         console.log(JSON.stringify(response.data));
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function sendMessage(userInput: string) {
    try {
        const data = new FormData();
        data.append('user_input', userInput);

        const response = await axios.post('http://localhost:8080/chat', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}
