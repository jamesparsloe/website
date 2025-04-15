import { Pre, RawCode, highlight } from "codehike/code"
import { CopyButton } from "./button"


export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")

  return (
    <div className="relative">
      <CopyButton text={highlighted.code} />
      <Pre
        code={highlighted}
      />
    </div>
  )
}
