import React, { useState, useEffect } from "react";
import axios from "axios";
import Snippet from "./Snippet.js";
import SnippetEditor from "./SnippetEditor.js";
export default function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);
  useEffect(() => {
    getSnippets();
  }, []);
  async function getSnippets() {
    const snippetsRes = await axios
      .get("http://localhost:5000/snippets/")
      .then((res) => setSnippets(res.data));
    return snippetsRes;
  }
  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }
  const renderSnippets = () => {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          snippet={snippet}
          key={i}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  };

  return (
    <div className="home">
      {!snippetEditorOpen && (
        <button onClick={() => setSnippetEditorOpen(true)}>
          Add snippet
        </button>
      )}
      {snippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {renderSnippets()}
    </div>
  );
}
