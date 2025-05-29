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


const createCategory = (req, res) => {
 async (req, res) => {
  try {
    const { name, description, image, eventTypes } = req.body;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const category = new Category({
      name,
      slug,
      description,
      image,
      eventTypes: eventTypes?.map(et => ({
        ...et,
        slug: et.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
      })) || []
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}};

const updateCategory = (req, res) => {
    async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, image, eventTypes } = req.body;

            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            category.name = name || category.name;
            category.description = description || category.description;
            category.image = image || category.image;
            category.eventTypes = eventTypes || category.eventTypes;

            await category.save();
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = {
    getAdmin
}