import { faArrowLeft, faArrowsRotate, faSave } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { useNavigate } from "react-router";
import { useWaterfallContext } from "../../context/waterfallContext";

export default function Navigation() {
  const { saveWaterfall, loadWaterfall, loadedWaterfall, unloadWaterfall, setSelectedCategory } = useWaterfallContext();

  const navigate = useNavigate();

  const goBack = () => {
    setSelectedCategory(null);
    navigate(-1);
    if (location.pathname === "/") unloadWaterfall();
  };

  return (
    <div className="sticky z-50 top-0 left-0 right-0 flex flex-row justify-between items-center gap-2 p-2 bg-background4">
      <div className="flex flex-row gap-2 items-center">
        <Button icon={faArrowLeft} onClick={() => goBack()} color="secondary" disabled={window.history.length <= 1}>
          {}
        </Button>
        <div>Editing {loadedWaterfall?.name}</div>
      </div>
      <div className="flex flex-row gap-2">
        <Button icon={faArrowsRotate} onClick={() => loadWaterfall()} color="secondary">
          Reload
        </Button>
        <Button icon={faSave} onClick={() => saveWaterfall()} color="primary">
          Save
        </Button>
      </div>
    </div>
  );
}
