import React, { useRef } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  name: string;
  label: string;
  filename?: string;
}

const FileInput: React.FC<Props> = ({
  onChange,
  onClear,
  name,
  label,
  filename,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const [filename, setFilename] = useState('');

  // const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFilename(e.target.files[0].name);
  //   } else {
  //     setFilename('');
  //   }
  //
  //   onChange(e);
  // };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filename || ''}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
        {onClear && (
          <Grid item>
            <Button variant="contained" onClick={onClear}>
              Clear
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FileInput;
