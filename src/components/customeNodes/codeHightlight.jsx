import { TextNode } from 'lexical';
import { CodeNode } from "@lexical/code";


class CodeHighlightNode extends TextNode {
  constructor(text) {
    super(text);
  }

  static getType() {
    return 'code-highlight';
  }

  static clone(node) {
    return new CodeHighlightNode(node.__text);
  }

  createDOM() {
    const element = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = this.__text;
    element.appendChild(code);
    return element;
  }

  updateDOM(prevNode, dom) {
    if (prevNode.__text !== this.__text) {
      dom.querySelector('code').textContent = this.__text;
    }
    return false;
  }

  exportJSON() {
    return {
      type: 'code-highlight',
      version: 1,
      text: this.__text,
    };
  }
}

export { CodeHighlightNode };
