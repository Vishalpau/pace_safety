import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import api from "../../../utils/axios"



function Group() {
    return (

        <PapperBlock title="Groups" icon="ion-md-list-box" desc="">
            <Grid container spacing={12}>
                <Grid md={3}>
                    <TextField
                        id="filled-basic"
                        label="Others"
                        variant="outlined"
                        onChange={async (e) => handelOthers(e)}
                    />

                </Grid>
                <Grid md={3}>
                    <TextField
                        id="filled-basic"
                        label="Others"
                        variant="outlined"
                        onChange={async (e) => handelOthers(e)}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        id="filled-basic"
                        label="Others"
                        variant="outlined"
                        onChange={async (e) => handelOthers(e)}
                    />
                </Grid>
                <Grid md={3}>
                    <button >Save</button>
                </Grid>
            </Grid>
        </PapperBlock>

    )

}

export default Group;