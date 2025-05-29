const express = require('express');

const getAdmin = (req, res) => {
    try {
        // Logic to get admin details
        res.status(200).json({ message: 'Admin details fetched successfully' });
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAdmin
}