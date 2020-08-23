import React,{useState} from 'react'
import './style.css'
import DateFnsUtils from '@date-io/date-fns';
import { stateOptions } from './data'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from 'react-select';
import { Row, Container } from 'react-bootstrap'
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core'


const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [trip, setTrip] = useState();
	const [city, setCity] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [pas,setPas] = useState("")


	const handleDateChange = (date) => {
		setSelectedDate(date);
		console.log(date)
	};
	const handlePass = (e) => {
		// setTrip(e.target.value);
		console.log(e.target.value)
	};
	const handleSelectFrom= (e)=>{
		if (e) {
			setCity(e.value)
			console.log(e.value,"form")
		}
	}
	const handleSelectTo= (e)=>{
		// if (e) {
		// 	setCity(e.value)
		// }
		console.log(e.value,'selectTO')
	}
	const handleClass= (e)=>{
		// if (e) {
		// 	setCity(e.value)
		// }
		console.log(e.target.value,'value class')
	}

	return (
		<div id="booking" className="section">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div className="section-center">
					<Container>
						<Row>
							<div className="col-md-4">
								<div className="booking-cta">
									<h1>Let Your Dreams take FLIGHT!</h1>
									<p > “Sometimes, flying feels too God-like to be attained by man. Sometimes, the world from above seems too beautiful, too wonderful, too distant for human eyes to see.”
													– Charles A. Lindbergh</p>
								</div>
							</div>
							<div className="col-md-7 col-md-offset-1">
								<div className="booking-form">
									<form>
										<div className="form-group">
											<RadioGroup row aria-label="position"  name="position" defaultValue="">
												<FormControlLabel value="Roundtrip" control={<Radio color="primary" />} label="Roundtrip" />
												<FormControlLabel value="One way" control={<Radio color="primary" />} label="One way" />
												<FormControlLabel value="Multi-City" control={<Radio color="primary" />} label="Multi-City" />
											</RadioGroup>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<span className="form-label">Flying from</span>
													<br></br>
													<Select
														// className="basic-single"
														// classNamePrefix="City or airport"
														placeholder="City or airport"
														// styles={{color:'red'}}
														// defaultValue={colourOptions[0]}
														onChange={handleSelectFrom}
														isClearable
														isSearchable														
														name="color"
														options={stateOptions}
														theme={theme => ({
															...theme,
															borderRadius: 5,
															// border:0,
															colors: {
															  ...theme.colors,
															//   primary25: 'primary',
															//   primary: 'black',
															//   border:0
															},
														  })}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<span className="form-label">Flyning to</span>
													<br></br>
													<Select
														// className="basic-single"
														// classNamePrefix="City or airport"
														placeholder="City or airport"
														// styles={{color:'red'}}
														// defaultValue={colourOptions[0]}
														onChange={handleSelectTo}
														isClearable
														isSearchable														
														name="color"
														options={stateOptions}
														theme={theme => ({
															...theme,
															borderRadius: 5,
															// border:0,
															colors: {
															  ...theme.colors,
															//   primary25: 'primary',
															//   primary: 'black',
															//   border:0
															},
														  })}
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
												<KeyboardDatePicker
													margin="normal"
													id="date-picker-dialog"
													label="Departing"
													// variant="inline"
													// inputVariant="outlined"
													// className="form-control"
													format="MM/dd/yyyy"
													value={selectedDate}
													onChange={handleDateChange}
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
												/>

												</div>
											</div>
											{/* <div className="col-md-6">
												<div className="form-group">
													<KeyboardDatePicker
														margin="normal"
														id="date-picker-dialog"
														label="Returning"
														// variant="inline"
														// inputVariant="outlined"
														// className="form-control"
														format="MM/dd/yyyy"
														value={selectedDate}
														onChange={handleDateChange}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
													/>
												</div>
											</div> */}
										</div>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<span className="form-label">Adults (18+)</span>
													<select onChange={handlePass} className="form-control">
														<option value="1">1</option>
														<option>2</option>
														<option>3</option>
													</select>
													<span className="select-arrow"></span>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<span className="form-label">Children (0-17)</span>
													<select className="form-control">
														<option>0</option>
														<option>1</option>
														<option>2</option>
													</select>
													<span className="select-arrow"></span>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<span className="form-label">Travel Class</span>
													<select  
														onChange={handleClass}
													className="form-control">
														<option value="economy">Economy Class</option>
														<option>Business Class</option>
														<option>First Class</option>
													</select>
													<span className="select-arrow"></span>
												</div>
											</div>
										</div>
										<div className="form-btn">
											<button className="submit-btn">Show flights</button>
										</div>
									</form>
								</div>
							</div>
						</Row>
					</Container>
				</div>
			</MuiPickersUtilsProvider>
		</div>
	)
}

export default Home