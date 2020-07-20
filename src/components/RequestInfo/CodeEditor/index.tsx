import React, {
  useEffect,
  useRef
} from 'react'
import Prism from 'prismjs'

import {
  Container,
  CodeEditorTextarea,
  CodeContainer,
  CodeMain,
  CodeHelper,
  BeautifyButton
} from './styles'
import { FiAlignLeft } from 'react-icons/fi'

export interface CodeEditorProps {
  value: string
  setContent(value: string): void
}

const CodeEditor:
  React.FC<CodeEditorProps> = (
    { value: content, setContent }
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      Prism.highlightAll()
    }, [content])

    useEffect(() => {
      setContent(textareaRef.current?.value || content)
    }, [textareaRef.current?.value])

    return (
      <Container>
        <CodeEditorTextarea
          ref={textareaRef}
          defaultValue={content}
        />
        <CodeContainer>
          <CodeMain className="language-javascript">{ content }</CodeMain>

        </CodeContainer>
        <CodeHelper>
          <BeautifyButton
            onClick={
              () => {
                let res
                try {
                  res =
                    JSON.stringify(
                      JSON.parse(
                        content
                      ),
                      undefined,
                      2
                    )
                } catch {
                  res = content
                }
                setContent(res)
              }
            }
          >
            <FiAlignLeft size={15}/>
          </BeautifyButton>
        </CodeHelper>
      </Container>
    )
  }

export default CodeEditor
