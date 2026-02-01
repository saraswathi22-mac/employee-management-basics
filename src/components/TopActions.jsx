import { Link } from "react-router-dom";
import Button from "./Button";

const TopActions = ({
  isToday,
  hasUnfinishedYesterday,
  onRollover,
}) => (
  <div className="flex gap-3 items-center">
    <Link to="/add-task">
      <Button>Add Interview Task</Button>
    </Link>

    {isToday && hasUnfinishedYesterday && (
      <Button onClick={onRollover}>
        Roll over unfinished tasks
      </Button>
    )}
  </div>
);

export default TopActions;
