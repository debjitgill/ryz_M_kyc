import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import useApi from "../../hooks/useApi";
import Loader from "../../components/loader";
import { extractParamsValue } from "../../utils/functions";
import useSessionStorage from "../../hooks/useSession";

function DigiLocker(props) {
  const [codeChallenger, setCodeChallenger] = useState("");
  const { fetchData, loading } = useApi();

  const extractCodeFromURL = () => {
    const { pathname, search, origin } = window.location;

    if (pathname.includes("/call") && search.includes("code=")) {
      const url = `${origin}${pathname}`;
      const newURL = url.replace("/call", "");
      // Update the URL in the browser without refreshing the page
      window.history.replaceState({}, document.title, newURL);
    }
  };
  const fetchCodeChallenger = async () => {
    try {
      const data = await fetchData("user/code-challenger");
      await setCodeChallenger(data?.codeChallenger);
      // await setSessionCodeChallenger(data?.codeChallenger);
    } catch (error) {
    }
  };

  const handleDigiLocker = () => {
    const stateId = "rmsign" + Math.random().toString(36).substring(7);
    sessionStorage.setItem("state", stateId);

    const redirectUri = encodeURIComponent(
      "https://uat.dwqn3zft5xrst.amplifyapp.com/call"
    );
    const digiLockerUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=IAE3E4C164&state=${stateId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenger}&code_challenge_method=S256`;

    window.location.href = digiLockerUrl;
  };

  useEffect(() => {
    const codeValue = extractParamsValue(window.location.href, "code");
    if (codeValue) {
      extractCodeFromURL();
      props.handlePostRequest({ code: codeValue }, "user/digilocker");
    } else {
      fetchCodeChallenger();
    }
  }, []);

  return (
    <div className="flex h-[60vh] justify-center items-center">
      <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://img1.digitallocker.gov.in/assets/img/digiLocker-Medium.png"
          alt="Sample image"
        />
      </div>
      <Loader open={loading} />
      <div>
        <Button
          disabled={!Boolean(codeChallenger)}
          size="small"
          onClick={handleDigiLocker}
          variant="outlined"
        >
          Proceed to Digi Locker
        </Button>
      </div>
    </div>
  );
}

export { DigiLocker };
