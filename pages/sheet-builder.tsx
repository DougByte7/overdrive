import { Sheet } from "@/common/sheet"
import ComponentEditorDialog from "@/sheet-builder/tools/sheet-components/editor-dialog"
import SheetBuilderContextProvider from "@/sheet-builder/sheet-builder-context"
import { useMediaQuery } from "@mui/material"
import { Menu } from "@/menu"
import SheetBuilderTools from "@/sheet-builder/tools"
import { css } from "@emotion/react"
import theme from "@/theme"

export default function SheetBuilder() {
  const minWidth850 = useMediaQuery("(min-width:850px)")

  return (
    <SheetBuilderContextProvider>
      <main css={styles}>
        <Menu />
        <section className="sheet-section">
          <Sheet edit />
        </section>
        <ComponentEditorDialog />
        {minWidth850 && <SheetBuilderTools />}
      </main>
    </SheetBuilderContextProvider>
  )
}

const styles = css`
  .sheet-section {
    overflow: auto;
    height: 100vh;
    display: flex;
    justify-content: center;

    form {
      margin-bottom: 6rem;
    }
  }

  .space {
    height: ${theme.spacing(12)};
  }

  @media screen and (min-width: 850px) {
    display: grid;
    grid-template-columns: 64px 1fr;

    .sheet-section {
      width: calc(100% - 350px);
      font-size: 0.875rem;
    }
  }
`
