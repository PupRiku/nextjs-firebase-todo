import { ListItem, ListItemText } from "@mui/material";
import moment from "moment";

const Todo = (id) => {
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#fafafa" }}
    >
      <ListItemText
        primary={id.title}
        secondary={moment(id.timestamp).format("MMMM do, yyyy")}
      />
    </ListItem>
  );
};

export default Todo;
