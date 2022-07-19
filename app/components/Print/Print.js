import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../utils/axios";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  iconteal: {
    color: "#517b8d",
    fontSize: "24px",
  },
}));

const Print = (props) => {
  const classes = useStyles();

  const [printData, setPrintData] = useState({ __html: "" });

  const printDiv = () => {
    let divContents = printData.__html;
    let a = window.open(
      "",
      "",
      `width=${(2 * window.innerWidth) / 3}, 
    height=${(3 * window.innerHeight) / 4}, 
    top=${window.innerHeight / 2 - (3 * window.innerHeight) / 4 / 2}, 
    left=${window.innerWidth / 2 - window.innerWidth / 3}`
    );
    a.document.write(
      `<html><title>Print ${props.typeOfModule} - ${props.number} </title>`
    );
    a.document.write("<body><br>");
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();
    a.print();
  };

  const printOutTheValue = async () => {
    const res = await api.get(
      `https://dev-safety1-api.paceos.io/${props.printUrl}`
    );
    setPrintData({ __html: res.data });
  };

  useEffect(() => {
    if (printData.__html !== "") {
      printDiv();
    }
  }, [printData]);

  return (
    <>
      <IconButton
        onClick={() => {
          printOutTheValue();
        }}
      >
        <PrintOutlinedIcon className={classes.iconteal} />
      </IconButton>
    </>
  );
};

export default Print;
