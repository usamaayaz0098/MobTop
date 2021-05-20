import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
const currencies = [
  { value: "a", label: "Categories" },
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function MultipleSelect() {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState("");
  const [currency, setCurrency] = React.useState("a");
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleChangeX = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="mt-5">
      <FormControl className={classes.formControl}>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChangeX}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="standard-basic"
          label="Search.."
          onChange={handleChange}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => alert(personName)}
          className="mt-3"
        >
          <SearchIcon fontSize="small" />
        </Button>
      </FormControl>
    </div>
  );
}
