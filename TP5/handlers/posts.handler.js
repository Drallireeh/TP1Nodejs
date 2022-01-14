const { Post, Comment } = require("../models");

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getOnePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id } });
        console.log(req.query)
        if (req.query && req.query.comments == true) {
            const comments = await Comment.findAll({
                where: {postId: post.id}
            });
            res.send({ "post": post, "comments": comments })
        } else res.send({ "post": post })
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getManyPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getOnePost,
  getManyPosts,
}
