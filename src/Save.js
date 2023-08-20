import Editor from "@monaco-editor/react";

export const Save = (props) => {
  return (
    <div>
      <Editor
        value=""
        height="50vh"
        width="100%"
        theme="vs-dark"
        language="javascript"
        // defaultLanguage="javascript"
      />
    </div>
  );
};
