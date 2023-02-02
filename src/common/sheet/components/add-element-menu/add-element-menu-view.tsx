import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { MenuAction } from "@/common/popup-menu/popup-menu-types"
import {
    ArrowDropDownCircleOutlined,
    CheckBoxRounded,
    TextFieldsRounded,
} from "@mui/icons-material"
import { PopupMenu } from "@/common/popup-menu"

interface AddElementMenuProps {
    blockIndex: number
}
export default function AddElementMenu(props: AddElementMenuProps) {
    const { blockIndex } = props
    const { openDialog } = useSheetBuilderContext()

    const menuActions: MenuAction[] = [
        {
            name: "Input",
            icon: <TextFieldsRounded />,
            func: openDialog("text", blockIndex),
        },
        {
            name: "Select",
            icon: <ArrowDropDownCircleOutlined />,
            func: openDialog("select", blockIndex),
        },
        {
            name: "Checkbox",
            icon: <CheckBoxRounded />,
            func: openDialog("checkbox", blockIndex),
        },
    ]

    return <PopupMenu id="add-component" actions={menuActions} />
}

