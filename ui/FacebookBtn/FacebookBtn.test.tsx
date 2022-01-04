import { render } from "@testing-library/react"
import { FacebookBtn } from "./FacebookBtn"

const urlId = "33b4c7154eaa"

test("Renders Facebook UI component", () => {
  const { container } = render(<FacebookBtn urlId={urlId} />)
  expect(container).toMatchSnapshot()
})
