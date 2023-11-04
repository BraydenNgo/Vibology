import React, { useEffect } from "react";

const Analyzer = () => {
    const callAnalyzer = async () => {
        const response = await fetch('http://localhost:8000', {
            method: 'GET', // or 'POST' if you are sending data
            headers: {
                'Content-Type': 'application/json',
                // Include other headers if needed, such as Authorization for JWT tokens
            },
            // If you need to send data with a POST request, include a body:
            // body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Here you have your data from the backend
        } else {
            // Handle errors
            console.error('Error fetching members:', response.statusText);
        }
    };

    useEffect(() => {
        callAnalyzer();
    }, []); // An empty dependency array means this will run once when the component mounts

    return (
        <>
            <p>Hello World</p>
        </>
    );
}

export default Analyzer;
