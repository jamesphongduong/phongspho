import React, { PureComponent } from 'react';
import { TextField, Button, Typography } from '..';
import {
  Input as MaterialInput,
  Container as MaterialContainer
} from '@material-ui/core';
import {
  isValidText,
  isValidPrice,
  isValidImageFile,
  SUCCESSFUL_UPLOAD
} from '../../utils';
import { INVALID_PRICE_INPUT, INVALID_TEXT_INPUT } from '../../utils';
import ReactS3 from 'react-s3';
import { S3Config } from '../../config';
import { postPhoto } from '../../api';

interface State {
  captionInput: string;
  locationInput: string;
  fileInput: File | undefined;
  [key: string]: string | File | undefined | boolean; // need to refactor
  captionInputValid: boolean;
  fileInputValid: boolean;
  locationInputValid: boolean;
}

export class Upload extends PureComponent<{}, State> {
  state = {
    captionInput: '',
    locationInput: '',
    fileInput: undefined,
    captionInputValid: false,
    fileInputValid: false,
    locationInputValid: false,
    showValidations: false
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value });
  };

  validateFormInputs = (): boolean => {
    const { captionInput, locationInput, fileInput } = this.state;
    const captionInputValid = isValidText(captionInput);
    const locationInputValid = isValidText(locationInput);
    const fileInputValid = isValidImageFile(fileInput);
    const formValid = captionInputValid && locationInputValid && fileInputValid;

    if (!formValid) {
      this.setState(
        {
          captionInputValid,
          locationInputValid,
          fileInputValid,
          showValidations: true
        },
        () => {
          setInterval(() => this.setState({ showValidations: false }), 2000);
        }
      );
      return false;
    }
    return true;
  };

  postDish = () => {
    const { captionInput, locationInput } = this.state;

    const formDataValid = this.validateFormInputs();

    if (formDataValid) {
      console.log('uploading to s3');
      this.S3FileUpload()
        .then((data: any) => {
          console.log('data', data);
          const imageURL = data.location;

          const postData = {
            captionInput,
            locationInput,
            imageURL
          };
          postPhoto(postData)
            .then(() => alert(SUCCESSFUL_UPLOAD))
            .catch((err) => alert(err));
        })
        .catch((err) => console.log('err', err));
    }
  };

  localFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e && e.target && e.target.files) {
      this.setState({ fileInput: e.target.files[0] });
    }
  };

  S3FileUpload = (): any => {
    const { fileInput } = this.state;

    return ReactS3.uploadFile(fileInput, S3Config);
  };

  render(): JSX.Element {
    const {
      captionInput,
      locationInput,
      captionInputValid,
      locationInputValid,
      fileInputValid,
      showValidations
    } = this.state;

    console.log('RENDER', this.state);
    return (
      <MaterialContainer maxWidth="sm" style={styles.container}>
        <Typography text="New Photo" variant="h4" />
        <TextField
          label="Caption"
          handleInput={this.onInputChange}
          value={captionInput}
          helperText={INVALID_TEXT_INPUT}
          invalid={showValidations && !captionInputValid}
        />
        <TextField
          label="Location"
          multiline
          handleInput={this.onInputChange}
          value={locationInput}
          helperText={INVALID_TEXT_INPUT}
          invalid={showValidations && !locationInputValid}
        />
        <MaterialInput
          margin="dense"
          type="file"
          required
          error={showValidations && !fileInputValid}
          fullWidth
          onChange={this.localFileUpload}
        />
        <Button onClick={this.postDish} color="secondary" label="Submit" />
      </MaterialContainer>
    );
  }
}

const styles = {
  container: {
    // border: '1px solid black',
    // height: '100%',
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column' as 'column'
  }
};
