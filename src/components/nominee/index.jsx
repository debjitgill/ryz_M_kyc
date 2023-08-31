import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const NOMINEE_DATA = [
  { key: "name", value: "Full Name" },
  { key: "email", value: "Email Id" },
  { key: "contactNumber", value: "Mobile Number" },
  {
    key: "relation",
    value: "Relation",
    options: [
      "Father",
      "Mother",
      "Sibling",
      "Spouse",
      "Child",
      "Father in law",
      "Mother in law",
      "Brother in law",
      "Sister in law",
      "Other",
    ],
  },
  { key: "sharePercentage", value: "Share Percentage" },
  { key: "dateOfBirth", value: "Date Of Birth" },
];

const ADDRESS_FORMAT = [
  { key: "street", value: "Street" },
  { key: "city", value: "City" },
  { key: "state", value: "State" },
  { key: "zipcode", value: "Zip Code" },
  { key: "country", value: "Country" },
];

export default function Nominee(props) {
  const { handleChange, data } = props;

  const handleDate = (obj) => {
    return `${obj.$D}/${obj.$M + 1}/${obj.$y}`;
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file, e.target.name);
  };

  const getBase64 = (file, name) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.handleChange("proofOfAddress", reader.result);
    };
  };

  const renderDatePicker = (item) => (
    <div className="flex flex-col" key={item.key}>
      <span className="font-semibold text-slate-700">{item.value}</span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Birth"
          name={item.key}
          // value={data[item.key] || null}
          onChange={(newValue) => handleChange(item.key, handleDate(newValue))}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );

  const renderDropdown = (item) => (
    <div className="flex flex-col" key={item.key}>
      <span className="font-semibold text-slate-700">{item.value}</span>
      <Select
        value={data[item.key] || ""}
        onChange={(event) => handleChange(item.key, event.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          {item.value}
        </MenuItem>
        {item.options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );

  const renderProofOfAddress = () => (
    <div
      className="flex min-h-[100px] justify-center items-baseline"
      key="proofOfAddress"
    >
      <span className="mr-4 text-slate-700 font-bold">
        Upload Address proof
      </span>
      <input type="file" name="photo" onChange={handleFileChange} />
      {data.proofOfAddress && (
        <>
          <div className="w-1/4 p-4">
            <img className="w-full" src={data.proofOfAddress} alt={`${data?.name} address proof`} />
          </div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => props.handleChange("proofOfAddress", "")}
          >
            x
          </Button>
        </>
      )}
    </div>
  );

  const renderTextField = (item) => (
    <div className="flex flex-col gap-2" key={item.key}>
      <span className="font-semibold text-slate-700">{item.value}</span>
      <TextField
        id={item.key}
        onChange={(event) => handleChange(item.key, event.target.value)}
        placeholder={item.value}
        name={item.key}
        variant="outlined"
        value={data[item.key] ?? ""}
      />
    </div>
  );

  const renderAddressField = (addressField) => (
    <div className="flex flex-col gap-2" key={addressField.key}>
      <span className="font-semibold text-slate-700">{addressField.value}</span>
      <TextField
        id={addressField.key}
        onChange={(event) =>
          handleChange(addressField.key, event.target.value, "addressDto")
        }
        placeholder={addressField.value}
        name={addressField.key}
        variant="outlined"
        value={data.addressDto?.[addressField.key] ?? ""}
      />
    </div>
  );

  return (
    <section className="grid grid-cols-2 gap-4 mb-4">
      {NOMINEE_DATA.map((item) =>
        item.key === "dateOfBirth"
          ? renderDatePicker(item)
          : item.options
          ? renderDropdown(item)
          : renderTextField(item)
      )}
      <div className="font-semibold text-slate-700">Address</div>
      {ADDRESS_FORMAT.map(renderAddressField)}
      {renderProofOfAddress()}
    </section>
  );
}
