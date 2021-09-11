import React from "react";
import axios from "axios";
import "./styles/Snippet.scss";
import environment from "../../util/environment.js";

export default function Snippet({ snippet, getSnippets, editSnippet }) {
  const { title, description, code, _id } = snippet;
  const deleteSnippet = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      await axios.delete(`${environment}/snippets/${_id}`);
      getSnippets();
    }
  };
  return (
    <div className="snippet">
      {title && <h2 className="title">{title}</h2>}
      {description && <p className="description">{description}</p>}
      {code && (
        <pre className="code">
          <code>{code}</code>
        </pre>
      )}
      <button className="btn-edit" onClick={() => editSnippet(snippet)}>
        Edit
      </button>
      <button className="btn-delete" onClick={deleteSnippet}>
        Delete
      </button>
    </div>
  );
}
