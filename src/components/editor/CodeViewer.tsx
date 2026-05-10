import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useRef } from 'react';
import { useSimulatorStore, algorithms } from '../../store/useSimulatorStore';

export const CodeViewer = () => {
  const monaco = useMonaco();
  const { selectedAlgorithm, trace, currentStepIndex } = useSimulatorStore();
  const code = algorithms[selectedAlgorithm].code;
  const activeLine = trace[currentStepIndex]?.activeLine || 1;
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (monaco && editorRef.current) {
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: new monaco.Range(activeLine, 1, activeLine, 1),
            options: {
              isWholeLine: true,
              className: 'active-line-highlight',
              glyphMarginClassName: 'active-line-glyph',
            },
          },
        ]
      );
      
      editorRef.current.revealLineInCenterIfOutsideViewport(activeLine);
    }
  }, [monaco, activeLine]);

  return (
    <div className="code-viewer-container">
      <div className="code-header">
        <h3>Algorithm Source</h3>
      </div>
      <div className="editor-wrapper">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onMount={handleEditorDidMount}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            glyphMargin: true,
            lineNumbersMinChars: 3,
            padding: { top: 16 }
          }}
        />
      </div>
    </div>
  );
};
