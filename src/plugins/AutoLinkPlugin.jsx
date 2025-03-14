import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode } from "@lexical/link";
import { AutoLinkPlugin as LexicalAutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { useEffect } from "react";

export default function AutoLinkPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([AutoLinkNode])) {
      throw new Error("AutoLinkPlugin: AutoLinkNode is not registered on the editor.");
    }
  }, [editor]);

  return <LexicalAutoLinkPlugin />;
}
