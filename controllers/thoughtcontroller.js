const { Thought, User } = require("../models");

const thoughtController = {
  
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-__v");
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select("-__v");
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      
      await User.findByIdAndUpdate(
        newThought.userId,
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );

      res.json(newThought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },


  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },


  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }

     
      await User.findByIdAndUpdate(
        deletedThought.userId,
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: "Thought deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
