import { Button, createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { ChangeEvent, DragEvent, useState } from "react";

interface IStyleProps {
  isDragging: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: "none"
    },
    paper: (props: IStyleProps) => ({
      height: "25rem",
      background: props.isDragging ? theme.palette.grey[600] : theme.palette.grey[200],
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    })
  })
);

interface IProps {
  onUpload: (file: string) => void;
}

const UploadButton: React.FC<IProps> = (props: IProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const classes = useStyles({
    isDragging: isDragging
  });

  const { onUpload } = props;

  const onFileUploaded = (event: ChangeEvent<HTMLInputElement>) => parseFile(event.target.files);

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => setIsDragging(false);

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    parseFile(event.dataTransfer.files);
  };

  const parseFile = (files: FileList | null) => {
    if (!files) {
      throw new Error("File not selected");
    }

    if (files.length > 1) {
      throw new Error("Only expected one file");
    }

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const fileResult = fileReader.result;
      if (!fileResult) {
        throw new Error("Empty file result");
      }

      onUpload(fileResult.toString());
    };

    fileReader.readAsText(files[0]);
  };

  return (
    <Paper className={classes.paper} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}>
      <input
        onChange={onFileUploaded}
        accept="text/csv"
        className={classes.input}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Choose a file or drag one
        </Button>
      </label>
    </Paper>
  );
};

export default UploadButton;
