import {
  Pre, RawCode, highlight,
  AnnotationHandler,
  InnerLine,
  InnerPre,
  InnerToken,

} from "codehike/code"
import { CopyButton } from "./button"



const wordWrap: AnnotationHandler = {
  name: "word-wrap",
  Pre: (props) => <InnerPre merge={props} className="whitespace-pre-wrap" />,
  Line: (props) => (
    <InnerLine merge={props}>
      <div
        style={{
          textIndent: `${-props.indentation}ch`,
          marginLeft: `${props.indentation}ch`,
        }}
      >
        {props.children}
      </div>
    </InnerLine>
  ),
  Token: (props) => <InnerToken merge={props} style={{ textIndent: 0 }} />,
}


export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")

  return (
    <div className="relative ">
      <CopyButton text={highlighted.code} />
      <Pre
        code={highlighted}
        style={highlighted.style}
        handlers={[wordWrap]}
      />
    </div>
  )
}
