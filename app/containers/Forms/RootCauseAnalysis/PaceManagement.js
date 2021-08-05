import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import Type from "../../../styles/components/Fonts.scss";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import {
	PROACTIVEMANAGEMENT,
	ASSESSMENTS,
	COMPILANCE,
	ENGAGEMENT
} from "../../../utils/constants"

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: "100%",
	},
	button: {
		margin: theme.spacing(1),
	},
}));


const PaceManagementControl = () => {
	const [form, setForm] = useState({
		ProActiveManagement: {
			remarkType: "options",
			rcaSubType: "ProActiveManagement",
			rcaRemark: [],
		},
		Assessments: {
			remarkType: "options",
			rcaSubType: "Assessments",
			rcaRemark: [],
		},
		Compilance: {
			remarkType: "options",
			rcaSubType: "Compilance",
			rcaRemark: [],
		},
		Engagement: {
			remarkType: "options",
			rcaSubType: "Engagement",
			rcaRemark: [],
		},
	})
	const [incidentDetail, setIncidentDetail] = useState({});
	const [apiCallObject, setApiCallObject] = useState([])

	const handelUpdateCheck = async () => {
		let page_url = window.location.href;
		const lastItem = parseInt(
			page_url.substring(page_url.lastIndexOf("/") + 1)
		);

		let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
		let previousData = await api.get(`/api/v1/incidents/${incidentId}/pacecauses/`);
	}

	const handelProactiveManagement = (e, value) => {
		if (e.target.checked == false) {
			let newData = form.ProActiveManagement.rcaRemark.filter((item) => item !== value);
			setForm({
				...form,
				ProActiveManagement: {
					remarkType: "options",
					rcaSubType: "ProActiveManagement",
					rcaRemark: newData,
				},
			});
		} else {
			setForm({
				...form,
				ProActiveManagement: {
					remarkType: "options",
					rcaSubType: "ProActiveManagement",
					rcaRemark: [...form.ProActiveManagement.rcaRemark, value],
				},
			});
		}
	};

	const handelAssessmet = (e, value) => {
		if (e.target.checked == false) {
			let newData = form.Assessments.rcaRemark.filter((item) => item !== value);
			setForm({
				...form,
				Assessments: {
					remarkType: "options",
					rcaSubType: "Assessments",
					rcaRemark: newData,
				},
			});
		} else {
			setForm({
				...form,
				Assessments: {
					remarkType: "options",
					rcaSubType: "Assessments",
					rcaRemark: [...form.Assessments.rcaRemark, value],
				},
			});
		}
	};

	const handelCompilance = (e, value) => {
		if (e.target.checked == false) {
			let newData = form.Compilance.rcaRemark.filter((item) => item !== value);
			setForm({
				...form,
				Compilance: {
					remarkType: "options",
					rcaSubType: "Compilance",
					rcaRemark: newData,
				},
			});
		} else {
			setForm({
				...form,
				Compilance: {
					remarkType: "options",
					rcaSubType: "Compilance",
					rcaRemark: [...form.Compilance.rcaRemark, value],
				},
			});
		}
	};

	const handelEngagement = (e, value) => {
		if (e.target.checked == false) {
			let newData = form.Engagement.rcaRemark.filter((item) => item !== value);
			setForm({
				...form,
				Engagement: {
					remarkType: "options",
					rcaSubType: "Engagement",
					rcaRemark: newData,
				},
			});
		} else {
			setForm({
				...form,
				Engagement: {
					remarkType: "options",
					rcaSubType: "Engagement",
					rcaRemark: [...form.Engagement.rcaRemark, value],
				},
			});
		}
	};

	const handelNext = async () => {
		let tempData = []
		Object.entries(form).map(async (item, index) => {
			let api_data = item[1];
			api_data.rcaRemark.map((value) => {
				let temp = {
					createdBy: "0",
					fkIncidentId: localStorage.getItem("fkincidentId"),
					rcaRemark: value,
					rcaSubType: api_data["rcaSubType"],
					rcaType: "Immediate",
					remarkType: api_data["remarkType"],
					status: "Active",
				};
				tempData.push(temp);
			})
		})
		await setApiCallObject(tempData)
		const res = await api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/bulkpacecauses/`, tempData);
	}


	const fetchIncidentDetails = async () => {
		const res = await api.get(
			`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
		);
		const result = res.data.data.results;
		await setIncidentDetail(result);
	};


	useEffect(() => {
		fetchIncidentDetails();
		handelUpdateCheck();
	}, []);

	const isDesktop = useMediaQuery("(min-width:992px)");

	const classes = useStyles();
	return (
		<PapperBlock
			title="Basic cause - PACE Management control"
			icon="ion-md-list-box"
		>
			<Grid container spacing={3}>
				{/* {console.log(apiCallObject)} */}
				<Grid container item md={9} spacing={3}>
					<Grid item md={6}>
						<Typography variant="h6" className={Type.labelName} gutterBottom>
							Incident number
						</Typography>
						<Typography className={Type.labelValue}>
							{incidentDetail.incidentNumber}
						</Typography>
					</Grid>

					<Grid item md={6}>
						<Typography variant="h6" className={Type.labelName} gutterBottom>
							RCA method
						</Typography>
						<Typography className={Type.labelValue}>
							PACE cause analysis
						</Typography>
					</Grid>

					<Grid item md={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Proactive management</FormLabel>
							<FormGroup>
								{PROACTIVEMANAGEMENT.map((value) => (
									<FormControlLabel
										control={<Checkbox name={value} />}
										label={value}
										// checked={form.supervision.rcaRemark.includes(value)}
										onChange={async (e) => await handelProactiveManagement(e, value)}
									/>
								))}
							</FormGroup>
						</FormControl>
						<Box borderTop={1} marginTop={2} borderColor="grey.300" />
					</Grid>

					<Grid item md={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Assessments</FormLabel>
							<FormGroup>
								{ASSESSMENTS.map((value) => (
									<FormControlLabel
										control={<Checkbox name={value} />}
										label={value}
										// checked={form.supervision.rcaRemark.includes(value)}
										onChange={async (e) => await handelAssessmet(e, value)}
									/>
								))}
							</FormGroup>
						</FormControl>
						<Box borderTop={1} marginTop={2} borderColor="grey.300" />
					</Grid>

					<Grid item md={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Compliance</FormLabel>
							<FormGroup>
								{COMPILANCE.map((value) => (
									<FormControlLabel
										control={<Checkbox name={value} />}
										label={value}
										// checked={form.supervision.rcaRemark.includes(value)}
										onChange={async (e) => await handelCompilance(e, value)}
									/>
								))}
							</FormGroup>
						</FormControl>
						<Box borderTop={1} marginTop={2} borderColor="grey.300" />
					</Grid>

					<Grid item md={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Engagement</FormLabel>
							<FormGroup>
								{ENGAGEMENT.map((value) => (
									<FormControlLabel
										control={<Checkbox name={value} />}
										label={value}
										// checked={form.supervision.rcaRemark.includes(value)}
										onChange={async (e) => await handelEngagement(e, value)}
									/>
								))}
							</FormGroup>
						</FormControl>
						<Box borderTop={1} marginTop={2} borderColor="grey.300" />
					</Grid>

					<Grid item md={12}>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={(e) => handelPrevious(e)}
						>
							Previous
						</Button>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={(e) => handelNext(e)}
						>
							Next
						</Button>
					</Grid>
				</Grid>
				{isDesktop && (
					<Grid item md={3}>
						<FormSideBar
							listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
							selectedItem={"PACE Management control"}
						/>
					</Grid>
				)}
			</Grid>
		</PapperBlock >
	)
}

export default PaceManagementControl;