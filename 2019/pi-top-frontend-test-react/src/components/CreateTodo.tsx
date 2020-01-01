import { Button, CardActions, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { ICreateTodo } from "../data/ITodo";
import { thunkAddTodo } from "../store/Thunk";

interface IProps {
  thunkAddTodo: () => void;
}

const CreateTodo = (props: IProps) => {
  const [title, setTitle] = useState("new title");
  const [description, setDescription] = useState("new desc");
  const [priority, setPriority] = useState(1);
  const [tags, setTags] = useState<string>("a,b,c");

  const { thunkAddTodo } = props;

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value);

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.currentTarget.value);

  const onPriorityChange = (event: ChangeEvent<{ name?: string; value: unknown }>) =>
    setPriority(event.target.value as number);

  const onTagsChange = (event: ChangeEvent<HTMLInputElement>) => setTags(event.target.value);

  const onClick = () => {
    const tagsArray = tags.length === 0 ? [] : tags.split(",");

    const todo: ICreateTodo = {
      description,
      priority,
      tags: tagsArray,
      title
    };

    thunkAddTodo(todo);
  };

  const isButtonDisabled = title.length === 0;

  return (
    <CardActions>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField value={title} onChange={onTitleChange} placeholder="What do you need to do?" />
        </Grid>
        <Grid item>
          <TextField
            multiline
            onChange={onDescriptionChange}
            rowsMax="3"
            value={description}
            placeholder="Description"
          />
        </Grid>
        <Grid item>
          <Select onChange={onPriorityChange} value={priority}>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Middle</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <TextField onChange={onTagsChange} value={tags} placeholder="Tags separated by a comma" />
        </Grid>

        <Grid item>
          <Button disabled={isButtonDisabled} onClick={onClick}>
            Add
          </Button>
        </Grid>
      </Grid>
    </CardActions>
  );
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  { thunkAddTodo }
)(CreateTodo);
