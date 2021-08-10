import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const TextButton = withStyles({
  root: {
    background: "transparent",
    color: "#3498db",
    textDecoration: "underline",
    whiteSpace: "normal",
    textAlign: "left",
  },
})(Button);

TextButton.defaultProps = {
  size: "small",
};

export default TextButton;
