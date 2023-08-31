import Button from "@mui/material/Button";
function Legality(props) {
  const handleRedirect = () => {
    console.log("props.data.message", props.data.message);
    window.location.href = props.data.message;
  };
  return (
    <div>
      <p className="mr-8">Legality</p>
      <Button variant="contained" color="success" onClick={handleRedirect}>
        Redirect Legality
      </Button>
    </div>
  );
}

export { Legality };
