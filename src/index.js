import Editor from "@monaco-editor/react";
import { Select, Switch, Collapse } from "antd";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { languageOptions } from "./languageOptions";

const { registerBlockType } = wp.blocks;

registerBlockType("code-editor/code-editor", {
  title: "Code Editor",
  icon: "editor-code",
  category: "text",
  attributes: {
    language: {
      type: "string",
      default: "javascript",
    },
    isDarkTheme: {
      type: "boolean",
      default: true,
    },
    code: {
      type: "string",
      default: "",
    },
  },

  edit: ({ className, attributes, setAttributes }) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
      editorRef.current = editor;
    };

    const items = [
      {
        key: "settings",
        label: "Code Editor Settings",
        children: (
          <div className="code-editor-settings">
            <div className="code-editor-input">
              <label>Language</label>
              <Select
                showSearch
                style={{ width: "150px" }}
                value={attributes.language}
                options={languageOptions}
                onChange={(value) => setAttributes({ language: value })}
              />
            </div>

            <div className="code-editor-input">
              <span>Light</span>
              <Switch
                checked={attributes.isDarkTheme}
                onChange={(checked) => setAttributes({ isDarkTheme: checked })}
              />
              <span>Dark</span>
            </div>
          </div>
        ),
      },
      {
        key: "editor",
        label: "Code Editor",
        children: (
          <Editor
            onMount={handleEditorDidMount}
            onChange={() =>
              setAttributes({ code: editorRef.current.getValue() })
            }
            value={attributes.code}
            height="80vh"
            width="100%"
            theme={attributes.isDarkTheme ? "vs-dark" : "vs"}
            language={attributes.language}
          />
        ),
      },
    ];

    return (
      <div className={className}>
        <Collapse items={items} defaultActiveKey={["settings", "editor"]} />
      </div>
    );
  },

  save: ({ attributes }) => {
    const codeLines = attributes.code.split("\n");
    const maxLineNumber = String(codeLines.length).length;

    return (
      <div className="code-block-container">
        <table cellSpacing={0} cellPadding={0} className="code-editor-table">
          {codeLines.map((line, index) => (
            <tr className="code-editor-row">
              <td
                className={`line-num ${
                  attributes.isDarkTheme ? "line-num-dark" : "line-num-light"
                }`}
                style={{ width: `${maxLineNumber}ch` }}
              >
                {index + 1}
              </td>
              <td>
                <SyntaxHighlighter
                  language={attributes.language}
                  style={attributes.isDarkTheme ? vscDarkPlus : vs}
                  customStyle={{
                    margin: "0",
                    padding: "5px 1rem",
                    border: "none",
                    width: "100%",
                    overflow: "scroll",
                  }}
                >
                  {line ? line : " "}
                </SyntaxHighlighter>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  },
});
