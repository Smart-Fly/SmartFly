import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { stateOptions } from "../data";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Select from "react-select";
import { Row, Container } from "react-bootstrap";
import { Radio, RadioGroup, FormControlLabel, Button } from "@material-ui/core";

const styles = {
  buttonBlue: {
    color: "white",
    background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 50%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .30)",
    height: 65,
    width: "100%",
  },
};

const Home = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date()); //Date
  const [clases, setClases] = useState("economy"); // class
  const [from, setFrom] = useState(); // from
  const [to, setTo] = useState(); //too
  const [totalAdults, setTotalAdults] = useState(1); //set total
  const [totalChildren, setTotalChildren] = useState(0); //set total
  const [totalInfant, setTotalInfant] = useState(0); //set total

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleAdults = (e) => {
    setTotalAdults(e.target.value);
  };
  const handleChildren = (e) => {
    setTotalChildren(e.target.value);
  };
  const handleInfant = (e) => {
    setTotalInfant(e.target.value);
  };
  const handleSelectFrom = (e) => {
    if (e) {
      // console.log(e)
      setFrom(e.value);
    }
  };
  const handleSelectTo = (e) => {
    if (e) {
      setTo(e.value);
    }
  };
  const handleClass = (e) => {
    setClases(e.target.value);
  };
  var todayDate = selectedDate.toISOString().slice(0, 10);
  const goSubmit = (e) => {
    e.preventDefault();

    history.push({
      pathname: `/${from}?${to}!${todayDate}@${totalAdults}#${totalChildren}$${totalInfant}=${clases}+`,
      state: {
        data: {
          dAirportCode: from,
          aAirportCode: to,
          planDate: todayDate,
          psAdult: +totalAdults,
          psChild: +totalChildren,
          psInfant: +totalInfant,
          classType: clases,
        },
      },
    });
  };

  return (
    <div id="booking" className="section">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="section-center">
          <Container>
            <Row>
              <div className="col-md-4">
                <div className="booking-cta">
                  <h1>Let Your Dreams take FLIGHT!</h1>
                  <p>
                    {" "}
                    “Sometimes, flying feels too God-like to be attained by man.
                    Sometimes, the world from above seems too beautiful, too
                    wonderful, too distant for human eyes to see.” – Charles A.
                    Lindbergh
                  </p>
                </div>
              </div>
              <div className="col-md-7 col-md-offset-1">
                <div className="booking-form">
                  <form onSubmit={(e) => goSubmit(e)}>
                    <div className="form-group">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue=""
                      >
                        <FormControlLabel
                          value="Roundtrip"
                          control={<Radio color="primary" />}
                          label="Roundtrip"
                        />
                        <FormControlLabel
                          value="One way"
                          control={<Radio color="primary" />}
                          label="One way"
                        />
                        <FormControlLabel
                          value="Multi-City"
                          control={<Radio color="primary" />}
                          label="Multi-City"
                        />
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
                            theme={(theme) => ({
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
                            theme={(theme) => ({
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
                              "aria-label": "change date",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="form-label">Travel Class</span>
                          <select
                            onChange={handleClass}
                            className="form-control"
                          >
                            <option value="economy">Economy </option>
                            <option value="premium_economy">
                              Premium-Economy{" "}
                            </option>
                            <option value="business">Business </option>
                            <option value="first">First </option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <span className="form-label">Adults (18+)</span>
                          <select
                            onChange={handleAdults}
                            className="form-control"
                          >
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
                          <select
                            onChange={handleChildren}
                            className="form-control"
                          >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <span className="form-label">infant</span>
                          <select
                            onChange={handleInfant}
                            className="form-control"
                          >
                            {/* <option value="economy">Economy Class</option> */}
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        ...styles.buttonBlue,
                      }}
                    >
                      Show flights
                    </Button>
                  </form>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Home;
