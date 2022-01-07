'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'author'
      });
      Comment.hasOne(models.Post);
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    date: DataTypes.DATE,
    author: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};