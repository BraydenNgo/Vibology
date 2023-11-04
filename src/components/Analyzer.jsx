import React, { useEffect } from "react";
import Cookies from 'js-cookie';

const Analyzer = () => {
    const callAnalyzer = async () => {
        const response = await fetch('http://localhost:8000/analyze', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${Cookies.get('token')}`,
            },
            // body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            // Handle errors
            console.error('Error fetching members:', response.statusText);
        }
    };

    useEffect(() => {
        callAnalyzer();
    }, []); 

    return (
        <>
            <p>Hello World</p>
        </>
    );
}

export default Analyzer;
