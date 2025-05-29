const express = require('express');
const dotenv = require('dotenv');
dotenv.config();



const getUser = (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }}





    

    module.exports = {

        getUser

}