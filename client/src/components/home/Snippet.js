import React from "react";
import axios from "axios";

export default function Snippet({ snippet, getSnippets, editSnippet }) {
  const { title, description, code, _id } = snippet;
  const deleteSnippet = async () => {
    await axios.delete(`http://localhost:5000/snippets/${_id}`);
    getSnippets();
  };
  return (
    <div className="snippet">
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {code && (
        <pre>
          <code>{code}</code>
        </pre>
      )}
      <button onClick={() => editSnippet(snippet)}>Edit</button>
      <button onClick={deleteSnippet}>Delete</button>
    </div>
  );
}
