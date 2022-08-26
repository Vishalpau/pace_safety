import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../utils/axios";
import { CircularProgress } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * @file - Print.js
 * @location /app/components/Print/Print.js
 * @description Serves the functionality of printing the particular one card details
 * @author Abhimanyu Soni <abhimanyus@teknobuilt.com>
 * @since v2.1.0
 **/

/**
 * Component name: Print
 * Component description: Serves the functionality of printing the particular one card details
 * @param printUrl string - API url to get the data to print
 * @param typeOfModule string - Module type eg. iCare, AHA, JHA etc.
 * @param number string - Number of particular card.
 * @return returntype
 * @since v2.1.0
 * @author Abhimanyu Soni <abhimanyus@teknobuilt.com>
 * @usedin CardFooter 
 * @example 
    <Print
        printUrl={printUrl}
        typeOfModule={typeOfModule}
        number={number}
    />
 **/

const useStyles = makeStyles((theme) => ({
  iconteal: {
    color: "#517b8d",
    fontSize: "24px",
  },
}));

const Print = (props) => {
  const classes = useStyles();

  const [printData, setPrintData] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);

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
    setTimeout(() => {
      a.print();
    }, 500);
  };

  const printOutTheValue = async () => {
    setLoading(true);
    await api
      .get(`https://dev-safety1-api.paceos.io/${props.printUrl}`)
      .then((res) => {
        setLoading(false);
        setPrintData({ __html: res.data });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (printData.__html !== "") {
      printDiv();
    }
  }, [printData]);

  return (
    <>
      <Tooltip title="Print" arrow>
        <IconButton
          onClick={() => {
            printOutTheValue();
          }}
          style={{ width: 45, height: 45 }}
        >
          {loading ? (
            <CircularProgress size={12} />
          ) : (
            <PrintOutlinedIcon className={classes.iconteal} />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Print;
