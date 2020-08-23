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
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'

const ADD_SEARCH = gql `
	mutation addSearch($newSearch: SearchInput) {
		addSearch(search: $newSearch) {
			departure
			arrival
		}
	}
`


const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [cityFrom, setCityFrom] = useState("");
	const [cityTo, setCityTo] = useState("");
	const [adults, setAdults] = useState(0)
	const [children, setChildren] = useState(0)
	const [seatClass, setSeatClass] = useState('')

	const history = useHistory()

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const handlePassAdults = (e) => {
		setAdults(e.target.value)
	};
	const handlePassChildren = (e) => {
		setChildren(e.target.value)
	}
	const handleSelectFrom= (e)=>{
		if (e) {
			setCityFrom(e.value)
		}
	}
	const handleSelectTo= (e)=>{
		if (e) {
			setCityTo(e.value)
		}
	}
	const handleClass= (e)=>{
		setSeatClass(e.target.value)
	}

	const searching = (e) => {
		e.preventDefault()
		const newAddSearch = {departure:cityFrom,arrival:cityTo}
		addSearch({variables: {newSearch: newAddSearch}})
		history.push(`/res/${cityFrom}/${cityTo}`)
	}

	const [addSearch, { error, data, loading }] = useMutation(ADD_SEARCH)

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
													<span className="form-label">Flying to</span>
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
													<select onChange={handlePassAdults} className="form-control">
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
													<select onChange={handlePassChildren} className="form-control">
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
											<button className="submit-btn" onClick={(e) => searching(e)}>Show flights</button>
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
