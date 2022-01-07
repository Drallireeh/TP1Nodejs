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
        foreignKey: {
          name: 'id',
        },
        onDelete: 'CASCADE',
      });
      Post.hasMany(models.Comment);
    }
  };
  Post.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};