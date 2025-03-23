import { useEffect } from "react";
import theme from "../components/theme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ListMaxIndentLevelPlugin from "../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "../plugins/AutoLinkPlugin";
import ToolbarPlugin from "../plugins/toolBar";
import {Input} from 'antd'
import "../styles.css";

function Placeholder() {
  return <div className="hidden">Enter some rich text...</div>;
}

const LexicalEditorConfig = {
  theme: theme,
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

// Separate component to handle Lexical Composer Context
function EditorUpdateListener({ onContentChange }) {
  const [editor] = useLexicalComposerContext(); // Now inside a child component

  useEffect(() => {
    const updateContent = () => {
      editor.update(() => {
        const content = JSON.stringify(editor.getEditorState());
        onContentChange(content);
      });
    };

    return editor.registerUpdateListener(updateContent);
  }, [editor, onContentChange]);

  return null;
}

export default function LexicalEditor({ onContentChange }) {
  return (
    <LexicalComposer initialConfig={LexicalEditorConfig}>
      <EditorUpdateListener onContentChange={onContentChange} />
      <div className="LexicalEditor-container">
        <ToolbarPlugin />
        {/* <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter blog title" 
                  size="large" 
                  className="mb-4 text-4xl font-bold border-none focus:ring-0"
                /> */}
        <div className="LexicalEditor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="LexicalEditor-input editor-input h-[400px] border-0" />
            }
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
