import React, { useState } from 'react';
import axios from "axios";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [personalDocument, setPersonalDocument] = useState(null);
    const [propertyDocument, setPropertyDocument] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        console.log(
            "NAME - ", name,
            "\nEMAIL - ", email,
            "\nNUMBER - ", number,
            "\nPASSWORD - ", password,
            "\nPERSONAL DOCUMENT - ", personalDocument,
            "\nPROPERTY DOCUMENT - ", propertyDocument,
        );

        const userData = {
            name: name,
            email: email,
            number: number,
            password: password,
            personal_document: personalDocument,
            property_document: propertyDocument
        };

        await axios.post('/user/register', userData)
            .then(response => {
                if (response.status === 200) {
                    console.log("User registered successfully");
                } else {
                    console.log("User registration failed");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    const handlePersonalDocumentChange = async (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('document', e.target.files[0]);
        await axios.post('https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6', formData)
            .then((res) => {
                setPersonalDocument(res.data.documentUrl);
                setLoading(false);
            });
    };

    const handlePropertyDocumentChange = async (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('document', e.target.files[0]);
        await axios.post('https://api.imgbb.com/1/upload?key=72c3b47f4500e0b0442afb4d0876bae6', formData)
            .then((res) => {
                setPropertyDocument(res.data.documentUrl);
                setLoading(false);
            });
    };

    return (
        <div>
            <label>Name</label>
            <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            <label>Number</label>
            <input value={number} type="tel" onChange={(e) => setNumber(e.target.value)} />
            <label>Password</label>
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            <label>Personal Document</label>
            <input type="file" onChange={handlePersonalDocumentChange} />
            <label>Property Document</label>
            <input type="file" onChange={handlePropertyDocumentChange} />
            {loading && <>Loading...</>}
            <button onClick={onSubmit}>Register</button>
        </div>
    );
};
