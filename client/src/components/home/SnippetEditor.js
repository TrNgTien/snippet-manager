import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/SnippetEditor.scss";

export default function SnippetEditor(props) {
  const { setSnippetEditorOpen, getSnippets, editSnippetData } = props;
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");
  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
      setEditorDescription(
        editSnippetData.description ? editSnippetData.description : ""
      );
      setEditorCode(editSnippetData.code ? editSnippetData.code : "");
    }
  }, [editSnippetData]);
  const saveSnippet = async (e) => {
    e.preventDefault();
    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };
    if (!editSnippetData)
      await axios.post("http://localhost:5000/snippets/", snippetData);
    else
      await axios.put(
        `http://localhost:5000/snippets/${editSnippetData._id}`,
        snippetData
      );
    getSnippets();
    closeEditor();
  };
  const closeEditor = () => {
    setEditorTitle("");
    setEditorCode("");
    setEditorDescription("");
    setSnippetEditorOpen(false);
  };
  return (
    <div className="snippet-editor">
      <form onSubmit={(e) => saveSnippet(e)}>
        <label htmlFor="editor-title">Title</label>
        <input
          id="editor-title"
          onChange={(e) => setEditorTitle(e.target.value)}
          value={editorTitle}
          type="text"
          name="title"
        />

        <label htmlFor="editor-description">Description</label>
        <input
          id="editor-description"
          onChange={(e) => setEditorDescription(e.target.value)}
          value={editorDescription}
          type="text"
          name="description"
        />

        <label htmlFor="editor-code">Code</label>
        <textarea
          id="editor-code"
          onChange={(e) => setEditorCode(e.target.value)}
          value={editorCode}
          type="text"
          name="code"
        />
        <button className="btn-save" type="submit">Save Snippet</button>
        <button className="btn-close" type="button" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}
