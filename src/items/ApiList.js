// import React, {useState,useCallback,useEffect} from 'react';
// import axios from 'axios';
// import {CRMAPI} from './URL';

// export function BasicData(e) {
//     const [loading, setLoading] = useState(false);
//     useCallback(async () => {
//     setLoading(true);
//     try{
//     const response = await axios.post
//     (
//         CRMAPI,
//         {
//             "task": "getUserInfoJson",
//             "user_n": "393-1500687152",
//             "user_id": "daaaaaaahae"
//         },
//         { withCredentials: true }
//     )
//     .then((response) => e(response.data))
//     } catch(e) {
//         console.error(e.message);
//     }
//     setLoading(false);
//     })
// }