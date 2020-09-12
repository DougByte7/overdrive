import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

export type SheetElements = "text" | "number" | "select" | "container";
type GridPosition = {
  rowStart: number;
  columnStart: number;
  rowEnd: number;
  columnEnd: number;
};
export type SheetField = {
  type: SheetElements;
  position: GridPosition;
  label?: string;
  value?: string | number;
  fields?: SheetField[];
  options?: string[];
};

interface SheetProps {
  fields: SheetField[];
  position?: GridPosition;
}

export default function Sheet(props: SheetProps) {
  const { fields, position } = props;

  return (
    <div className="sheet">
      {fields?.map((field, i) => {
        const { type, label, value, position, options } = field;
        const id = `${label}_${type}_${i}`;
        const gridArea = {
          gridArea: `${position?.rowStart} / ${position?.columnStart} /
            ${position?.rowEnd} / ${position?.columnEnd}`,
        };

        switch (type) {
          case "number":
          case "text":
            return (
              <TextField
                key={id}
                label={label}
                value={value}
                type={type}
                style={gridArea}
              />
            );

          case "select":
            return (
              <FormControl style={gridArea}>
                <InputLabel id={id}>{label}</InputLabel>
                <Select key={id} labelId={id} value={value}>
                  {options!.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          case "container":
            return (
              <Sheet key={id} fields={field.fields!} position={position} />
            );
        }
      })}
      <style jsx>{`
        .sheet {
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(12, 1fr);
          width: 50rem;
          margin: 0 auto;

          ${!!position
            ? `grid-area: ${position.rowStart} / ${position.columnStart} /
            ${position.rowEnd} / ${position.columnEnd};`
            : ""}
        }
      `}</style>
    </div>
  );
}
