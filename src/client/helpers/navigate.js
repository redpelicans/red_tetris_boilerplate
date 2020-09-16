import { useHistory } from "react-router-dom";

export const useNavigation = () => {
  const history = useHistory();
  return {
    navigate: (link) => history.push(`/${link}`),
  };
};
