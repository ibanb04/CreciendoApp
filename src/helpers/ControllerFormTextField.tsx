import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface ControllerFormTextFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  margin: "dense" | "none" | "normal";
  size: "medium" | "small" | undefined;
  variant: "filled" | "outlined" | "standard";
  maxRows?: number;
}

export const ControllerFormTextField: FC<ControllerFormTextFieldProps> = ({
  control,
  name,
  id,
  label,
  placeholder,
  size,
  variant,
  type,
  margin,
  maxRows = 1,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          id={id}
          multiline
          maxRows={maxRows}
          label={label}
          variant={variant}
          type={type}
          placeholder={placeholder}
          margin={margin}
          size={size}
          sx={{ width: { xs: "80%", sm: "90%" } }}
          {...field}
        />
      )}
    />
  );
};
