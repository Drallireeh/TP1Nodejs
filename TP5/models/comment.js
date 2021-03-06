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
        foreignKey: {
          name: 'userId',
          type: DataTypes.UUID,
          allowNull: false
        },
      });
      Comment.belongsTo(models.Post, {
        foreignKey: {
          name: 'postId',
          type: DataTypes.UUID,
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    }
  };
  Comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.UUID,
    postId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};