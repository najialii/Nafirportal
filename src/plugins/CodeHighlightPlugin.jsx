import { registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (editor) {
      // Make sure the editor instance is available before calling registerCodeHighlighting
      registerCodeHighlighting(editor);
    }
  }, [editor]); // Only run when editor is available

  return null;
}
