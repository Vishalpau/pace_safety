import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Editor from '../../../components/Editor';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';



import api from "../../../utils/axios"
import { handelIncidentId } from "../../../utils/CheckerValue"
import { async } from "fast-glob";
import ReadOnlyRow from "./CheckListCompoment/ReadGroups"

const useStyles = makeStyles((theme) => ({
    tabelBorder: {
        width: 110,
        fontWeight: 600,
    },
}));

function Group() {

    const [form, setForm] = useState(
        {
            "fkCompanyId": "0",
            "fkProjectId": "",
            "fkCheckListId": "",
            "checkListGroupName": "",
            "parentGroup": "",
            "createdBy": 0,
            "updatedBy": 0
        }
    )

    const [group, setGroup] = useState([])

    const [checkListId, setCheckListId] = useState("")
    const [allGroupName, setAllGroupName] = useState([])
    const [projectName, setProjectName] = useState({})
    const handelGroup = async () => {
        const tempGroupName = []
        let groupID = handelIncidentId()
        setCheckListId(groupID)
        const res = await api.get(`api/v1/core/checklists/${groupID}/groups/`)
        const result = res.data.data.results
        let allGroups = result
        setGroup(allGroups)
        allGroups.map((value) => {
            tempGroupName.push(value.checkListGroupName)
        })
        tempGroupName.push("Top")
        // fkProjectId
        console.log(result)
        setAllGroupName(tempGroupName)
    }

    const handelCheckList = (e) => {
        setForm({
            ...form,
            checkListGroupName: e.target.value,
            fkCheckListId: checkListId
        })
    }

    const handelNext = async () => {
        const res = await api.post(`api/v1/core/checklists/${checkListId}/groups/`, form)
        if (res.status == 201) {
            setForm({
                ...form,
                checkListGroupName: "",
                fkCheckListId: ""
            })
            handelGroup()
        }
    }

    const handelParentValue = (value) => {
        if (value == "Top") {
            setForm({
                ...form,
                parentGroup: "0",
            })
        } else {
            setForm({
                ...form,
                parentGroup: "1",
            })
        }
    }

    const handelParentShow = (value) => {
        if (value == 0) {
            return "Top"
        } else {
            return "Sub"
        }
    }

    const handleEdit = () => {
        // const { editStart } = this.props; // eslint-disable-line no-shadow
        // return () => editStart(String(widget.id));
    };

    const handelProjectName = () => {
        const tempProject = {}
        const company = JSON.parse(localStorage.getItem("company"));
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));

        const data = userDetails.companies.map((item) => {
            if (item.companyId === parseInt(company.fkCompanyId)) {
                return item.projects;
            }
        });

        data.map((value) => {
            if (value != undefined && Array.isArray(value)) {
                value.map((subValue) => {
                    tempProject[subValue["projectId"]] = subValue["projectName"]
                })
            }
        })
        setProjectName(tempProject)
    }

    const editFormData = () => {

    }

    const handleEditFormChange = () => {

    }

    const handleCancelClick = () => {

    }

    const handleEditClick = () => {

    }

    const handleDeleteClick = () => {

    }



    const classes = useStyles();

    useEffect(() => {
        handelGroup()
        handelProjectName()
    }, [])

    return (

        <PapperBlock title="Groups" icon="ion-md-list-box" desc="">
            <Button variant="contained" color="secondary" style={{ marginLeft: "1050px" }}>
                <AddIcon />
                New
            </Button>
            <Grid container spacing={12}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>Group Name</TableCell>
                            <TableCell className={classes.tabelBorder}>Parent Group</TableCell>
                            <TableCell className={classes.tabelBorder}>Status</TableCell>
                            <TableCell className={classes.tabelBorder}>Action</TableCell>
                        </TableRow>
                        {group.map((value, index) => (
                            <>
                                <ReadOnlyRow
                                    value={value}
                                // handleEditClick={handleEditClick}
                                // handleDeleteClick={handleDeleteClick}
                                />
                            </>
                        ))}

                        <TableRow>

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="group name"
                                    variant="outlined"
                                    onChange={async (e) => handelCheckList(e)}
                                />
                            </TableCell>

                            <TableCell className={classes.tabelBorder} >
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                    label="Group name"
                                >
                                    <Select
                                        id="Group-name"
                                        className="inputCell"
                                        labelId="Group name"
                                        defaultValue="Top"
                                    >
                                        {allGroupName.map((selectValues) => (
                                            <MenuItem
                                                value={selectValues}
                                                onClick={(e) => handelParentValue(selectValues)}
                                            >
                                                {selectValues}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <button onClick={(e) => handelNext(e)}>Save</button>
                            </TableCell>

                        </TableRow>


                    </TableBody>
                </Table>

            </Grid>
        </PapperBlock>

    )

}

export default Group;