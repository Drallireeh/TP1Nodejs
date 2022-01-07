'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'author'
      });
      Post.hasMany(models.Comment);
    }
  };
  Post.init({
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    author: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};