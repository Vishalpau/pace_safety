import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Editor from '../../../components/Editor';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import api from "../../../utils/axios"
import { handelIncidentId } from "../../../utils/CheckerValue"
import { async } from "fast-glob";
import ReadOnlyOptionRow from "./CheckListCompoment/ReadOptions";
import EditOnlyOptionRow from "./CheckListCompoment/EditOptions"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },

    tabelBorder: {
        width: 110,
        fontWeight: 600,
    },

}));

function Option() {
    const history = useHistory()
    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;

    const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
        ? JSON.parse(localStorage.getItem('userDetails')).id
        : null;

    const projectId =
        JSON.parse(localStorage.getItem("projectName")) !== null
            ? JSON.parse(localStorage.getItem("projectName"))["projectName"]["projectId"]
            : null;

    const [form, setForm] = useState(
        {
            "fkCompanyId": fkCompanyId,
            "fkProjectId": projectId,
            "parentCheckListValue": 0,
            "inputValue": "",
            "inputLabel": "",
            "isSystem": "No",
            "status": "",
            "createdBy": userId,
            "updatedBy": 0,
            "fkCheckListId": "",
            "fkGroupId": "",
        }
    )
    const [newOptionError, setNewOptionError] = useState(false)
    const [group, setGroup] = useState([])
    const [option, setOption] = useState([])
    const [checkListId, setCheckListId] = useState("")
    const [optionTemp, setOptionTemp] = useState("")
    const [editOptionId, setEditOptionId] = useState(null)
    const [showNew, setShowNew] = useState(false)
    const [viewUpdate, setViewUpdate] = useState(false)
    const [searchFilter, setSearchFilter] = useState({
        search: "",
        filter: ""
    })
    const [allOption, setAllOption] = useState([])

    const handelGroup = async () => {
        const temp = {}
        let groupID = handelIncidentId()
        setCheckListId(groupID)
        const optionApiData = await api.get(`api/v1/core/checklists/${groupID}/options/`)
        const allOptions = optionApiData.data.data.results
        setOption(allOptions)
        console.log(allOptions)
        const groupApiData = await api.get(`api/v1/core/checklists/${groupID}/groups/`)
        const result = groupApiData.data.data.results
        let allGroups = result
        allGroups.map((value) => {
            temp[value.checklistgroupId] = value.checkListGroupName
        })
        setGroup(temp)
        setAllOption(allOptions)
    }

    const handelEditClose = () => {
        setEditOptionId(null)
    }

    const handelNext = async (e) => {
        if (form.inputLabel.trim() && form.fkGroupId.trim()) {
            form["fkCheckListId"] = checkListId
            form["inputValue"] = form["inputLabel"] !== "" && form["inputLabel"].toLowerCase().replace(" ", "-")
            // delete form["id"]
            const res = await api.post(`api/v1/core/checklists/${checkListId}/options/`, form)
            if (res.status == 201) {
                handelGroup()
            }

            setViewUpdate(!viewUpdate)
            setShowNew(false)
            setNewOptionError(false)
        } else {
            setNewOptionError(true)
        }
    }

    const handleEditClick = (e, option) => {
        e.preventDefault()
        setEditOptionId(option.id)
    }

    const classes = useStyles();

    useEffect(() => {
        handelGroup()
    }, [viewUpdate])

    const handleSearchFilterChange = (value, key) => {
        setSearchFilter(data => ({
            ...data,
            [key]: value
        }))
    }

    useEffect(() => {
        const temp = [];
        allOption.forEach(value => {
            if (searchFilter.search) {
                if (searchFilter.filter) {
                    if (value.inputLabel.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1 && value.status.toLowerCase() === searchFilter.filter) {
                        temp.push(value)
                    }
                } else {
                    if (value.inputLabel.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1) {
                        temp.push(value)
                    }
                }
            } else {
                if (searchFilter.filter) {
                    if (searchFilter.filter === value.status.toLowerCase()) {
                        temp.push(value)
                    }
                } else {
                    temp.push(value)
                }
            }
        })

        setOption([...temp])
    }, [searchFilter, allOption])

    return (

        <PapperBlock title="Check List Option" icon="ion-md-list-box" desc="">
            <Button style={{ marginBottom: '16px', marginLeft: "auto", display: 'block', fontSize: '12px', textDecoration: 'underline' }} onClick={() => history.goBack()}>Go back</Button>
            {/* {console.log(form)} */}
            <Button
                variant="contained"
                color="secondary"
                onClick={(e) => setShowNew(true)}
                style={{ float: "right" }}
            >
                <AddIcon />
                New
            </Button>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField id="outlined-basic" label="Search Option"
                        onChange={(e) => handleSearchFilterChange(e.target.value, 'search')}
                        value={searchFilter.search}
                        variant="outlined" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel style={{ marginLeft: '20px', marginTop: '-5px' }} id="checklistSearchFilter">Filter</InputLabel>
                        <Select
                            style={{ minWidth: '120px' }}
                            labelId="checklistSearchFilte"
                            id="demo-simple-select-helper"
                            onChange={(e) => handleSearchFilterChange(e.target.value, 'filter')}
                            value={searchFilter.filter}
                            variant="outlined"
                            label="Filter"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={"active"}>Status - active</MenuItem>
                            <MenuItem value={"inactive"}>Status - inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={12}>
                <Table className={classes.table}>

                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>
                                Option Name(Input Label)
                            </TableCell>
                            <TableCell className={classes.tabelBorder}>
                                Input Value
                            </TableCell>
                            {Object.keys(group).length > 0 ?
                                <TableCell className={classes.tabelBorder}>
                                    Group name
                                </TableCell>
                                : null}

                            <TableCell className={classes.tabelBorder}>
                                Status
                            </TableCell>
                            <TableCell className={classes.tabelBorder}>
                                Action
                            </TableCell>
                        </TableRow>

                        {option.map((value, index) => (
                            <>
                                {editOptionId == value.id ?
                                    <EditOnlyOptionRow
                                        value={value}
                                        group={group}
                                        handelEditClose={handelEditClose}
                                        viewUpdate={viewUpdate}
                                        setViewUpdate={setViewUpdate}
                                    />
                                    :
                                    <ReadOnlyOptionRow
                                        value={value}
                                        group={group}
                                        handleEditClick={handleEditClick}
                                        viewUpdate={viewUpdate}
                                        setViewUpdate={setViewUpdate}
                                    />
                                }
                            </>
                        ))}
                        {showNew ?
                            <TableRow>
                                <TableCell className={classes.tabelBorder} >
                                    <TextField
                                        id="filled-basic"
                                        label="Option Name"
                                        variant="outlined"
                                        onChange={async (e) => setForm({ ...form, inputLabel: e.target.value })}
                                        error={newOptionError && !form.inputLabel.trim()}
                                    />
                                </TableCell>

                                <TableCell className={classes.tabelBorder} >
                                    <TextField
                                        id="filled-basic"
                                        label="Option value"
                                        variant="outlined"

                                    />
                                </TableCell>

                                {Object.keys(group).length > 0 ?
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
                                                error={newOptionError && !form.fkGroupId.trim()}
                                            >
                                                {Object.entries(group).map(([key, value]) => (
                                                    <MenuItem
                                                        value={key}
                                                        onClick={async (e) => setForm({ ...form, fkGroupId: key })}
                                                    >
                                                        {value}
                                                    </MenuItem>
                                                ))}


                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    : null}




                                <TableCell className={classes.tabelBorder}>
                                    <Switch
                                        // checked={true}
                                        onChange={(e) => e.target.checked ?
                                            setForm({ ...form, status: "Active" }) :
                                            setForm({ ...form, status: "inactive" }
                                            )}
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </TableCell>

                                <TableCell>
                                    <DoneIcon
                                        onClick={(e) => handelNext(e)}
                                    />
                                    <span style={{ marginLeft: "20px" }}>
                                        <DeleteIcon />
                                    </span>

                                </TableCell>
                            </TableRow>
                            : null}
                    </TableBody>
                </Table>
                {newOptionError && (<p style={{ fontSize: '14px', color: "#ff0000" }}>Please fill all the mandatory fields</p>)}
            </Grid>
        </PapperBlock>

    )

}

export default Option;