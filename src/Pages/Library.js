import React from "react";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const Container = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  .first_card,
  .second_card {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-basis: 48%;
    border-radius: 15px;
    background-color: rgba(255, 255, 255);
    height: 200px;
  }
  .radioContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;
const FilterCard = styled.div``;

function valuetext(value) {
  return `${value}°C`;
}

export default function Library() {
  const [value, setValue] = React.useState([20, 37]);
  const [radioValue, setRadioValue] = React.useState("female");
  const [age, setAge] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);
  };
  const handleGenreChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Container>
      <div className="first_card">
        <FilterCard style={{ width: "100%" }}>
          <FormControl component="fieldset" style={{ width: "100%" }}>
            <RadioGroup
              name="gender1"
              value={radioValue}
              onChange={handleChangeRadio}
              className="radioContainer"
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="popularity"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Year"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Name"
              />
            </RadioGroup>
          </FormControl>
        </FilterCard>
      </div>
      <div className="second_card">
        <div>
          <Typography id="range-slider" gutterBottom>
            Temperature range
          </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
        <div>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              onChange={handleGenreChange}
            >
              <MenuItem value="">
                <em>Romantic</em>
              </MenuItem>
              <MenuItem value={10}>Comedy</MenuItem>
              <MenuItem value={20}>Drama</MenuItem>
              <MenuItem value={30}>Horror</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </div>
      </div>
    </Container>
  );
}
