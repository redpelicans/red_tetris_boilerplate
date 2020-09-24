import { useHistory } from "react-router-dom";

function useNavigate() {
  const history = useHistory();

  function navigate(link) {
    history.push(`${link}`);
  }

  return { navigate };
}

export default useNavigate;
