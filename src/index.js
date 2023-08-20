import Editor from "@monaco-editor/react";
import { Select, Switch, Collapse } from "antd";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
const { registerBlockType } = wp.blocks;

const languageOptions = [
  { value: "abap", label: "abap" },
  { value: "apex", label: "apex" },
  { value: "azcli", label: "azcli" },
  { value: "bat", label: "bat" },
  { value: "bicep", label: "bicep" },
  { value: "cameligo", label: "cameligo" },
  { value: "clojure", label: "clojure" },
  { value: "coffee", label: "coffee" },
  { value: "cpp", label: "cpp" },
  { value: "csp", label: "csp" },
  { value: "css", label: "css" },
  { value: "cypher", label: "cypher" },
  { value: "dart", label: "dart" },
  { value: "dockerfile", label: "dockerfile" },
  { value: "ecl", label: "ecl" },
  { value: "elixir", label: "elixir" },
  { value: "flow9", label: "flow9" },
  { value: "freemarker2", label: "freemarker2" },
  { value: "go", label: "go" },
  { value: "graphql", label: "graphql" },
  { value: "handlebars", label: "handlebars" },
  { value: "hcl", label: "hcl" },
  { value: "html", label: "html" },
  { value: "ini", label: "ini" },
  { value: "java", label: "java" },
  { value: "javascript", label: "javascript" },
  { value: "kotlin", label: "kotlin" },
  { value: "less", label: "less" },
  { value: "feat", label: "feat" },
  { value: "lexon", label: "lexon" },
  { value: "liquid", label: "liquid" },
  { value: "lua", label: "lua" },
  { value: "m3", label: "m3" },
  { value: "markdown", label: "markdown" },
  { value: "mdx", label: "mdx" },
  { value: "mips", label: "mips" },
  { value: "msdax", label: "msdax" },
  { value: "mysql", label: "mysql" },
  { value: "objective", label: "objective" },
  { value: "c", label: "c" },
  { value: "pascal", label: "pascal" },
  { value: "pascaligo", label: "pascaligo" },
  { value: "perl", label: "perl" },
  { value: "pgsql", label: "pgsql" },
  { value: "pla", label: "pla" },
  { value: "postiats", label: "postiats" },
  { value: "powerquery", label: "powerquery" },
  { value: "powershell", label: "powershell" },
  { value: "protobuf", label: "protobuf" },
  { value: "pug", label: "pug" },
  { value: "python", label: "python" },
  { value: "qsharp", label: "qsharp" },
  { value: "r", label: "r" },
  { value: "razor", label: "razor" },
  { value: "redis", label: "redis" },
  { value: "redshift", label: "redshift" },
  { value: "restructuredtext", label: "restructuredtext" },
  { value: "ruby", label: "ruby" },
  { value: "rust", label: "rust" },
  { value: "sb", label: "sb" },
  { value: "scala", label: "scala" },
  { value: "scheme", label: "scheme" },
  { value: "scss", label: "scss" },
  { value: "feat", label: "feat" },
  { value: "shell", label: "shell" },
  { value: "solidity", label: "solidity" },
  { value: "sophia", label: "sophia" },
  { value: "sparql", label: "sparql" },
  { value: "sql", label: "sql" },
  { value: "st", label: "st" },
  { value: "swift", label: "swift" },
  { value: "systemverilog", label: "systemverilog" },
  { value: "tcl", label: "tcl" },
  { value: "test", label: "test" },
  { value: "twig", label: "twig" },
  { value: "typescript", label: "typescript" },
  { value: "vb", label: "vb" },
  { value: "wgsl", label: "wgsl" },
  { value: "xml", label: "xml" },
  { value: "yaml", label: "yaml" },
];

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
