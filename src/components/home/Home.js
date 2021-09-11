import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Snippet from "./Snippet";
import { Link } from "react-router-dom";
import SnippetEditor from "./SnippetEditor";
import "./styles/Home.scss";
import UserContext from "../../context/UserContext";
import environment from "../../util/environment.js";

export default function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) setSnippets([]);
    else getSnippets();
  }, [user]);
  async function getSnippets() {
    const snippetsRes = await axios
      .get(`${environment}/snippets/`)
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
      {!snippetEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setSnippetEditorOpen(true)}
        >
          Add snippet
        </button>
      )}
      {snippetEditorOpen && user && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <h3 className="no-snippets-msg">No Snippets have been added yet</h3>
          )}
      {user === null && (
        <div className="no-user-message">
          <h2>Welcome to Snippet manager</h2>
          <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
}
