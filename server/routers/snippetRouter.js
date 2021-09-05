const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.get("/", async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).send();
  }
});
router.post("/", async (req, res) => {
  try {
    const { title, description, code } = req.body;
    if (!title || !code) {
      return res.status(400).json({
        error: "Please provide title and your codes snipper!",
      });
    } else {
      const newSnippet = new Snippet({ title, description, code });
      const savedSnippet = await newSnippet.save();
      return res.status(200).send(savedSnippet);
    }
  } catch (err) {
    res.status(500).send();
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { title, description, code } = req.body;
    const snippetId = req.params.id;

    if (!title || !code) {
      return res.status(400).json({
        error: "Please provide title and your codes snipper!",
      });
    }
    // validation
    if (!snippetId) {
      return res.status(400).json({
        error: "Snippet Id not given. Please contact the devloper.",
      });
    } else {
      const originalSnippet = await Snippet.findById(snippetId);
      if (!originalSnippet) {
        return res.status(400).json({
          error:
            "No snippet with this id was found . Please contact the devloper.",
        });
      } else {
        originalSnippet.title = title;
        originalSnippet.description = description;
        originalSnippet.code = code;
        const savedSnippet = await originalSnippet.save();
        res.json(savedSnippet);
      }
    }
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const snippetId = req.params.id;

    // validation
    if (!snippetId) {
      return res.status(400).json({
        error: "Snippet Id not given. Please contact the devloper.",
      });
    } else {
      const existingSnippet = await Snippet.findById(snippetId);
      if (!existingSnippet) {
        return res.status(400).json({
          error:
            "No snippet with this id was found . Please contact the devloper.",
        });
      } else {
        await existingSnippet.delete();
        res.json(existingSnippet);
      }
    }
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
