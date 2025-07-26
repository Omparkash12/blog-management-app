const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metaTitle: {
        type: DataTypes.STRING,
    },
    metaDescription: {
        type: DataTypes.STRING,
    },
});

module.exports = Blog;
