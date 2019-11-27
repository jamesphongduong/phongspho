import React, { PureComponent } from 'react';
import { TextField, Button, Typography } from '../';
import {
  Input as MaterialInput,
  Container as MaterialContainer
} from '@material-ui/core';
import { isValidText, isValidImageFile, SUCCESSFUL_UPLOAD } from '../../utils';
import { INVALID_TEXT_INPUT } from '../../utils';
import ReactS3 from 'react-s3';
import { RouteComponentProps, withRouter } from 'react-router';
import { S3Config } from '../../config';
import { postPhoto } from '../../api';
import { AxiosPromise } from 'axios';
import { S3response, fileOrUndefined } from '../../types';

type Props = RouteComponentProps<{}>; // possible refactor

interface State {
  captionInput: string;
  fileInput: fileOrUndefined;
  captionInputValid: boolean;
  fileInputValid: boolean;
  showValidations: boolean;
}

class _Upload extends PureComponent<Props, State> {
  state = {
    captionInput: '',
    fileInput: undefined,
    captionInputValid: false,
    fileInputValid: false,
    showValidations: false
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value } as any); // possible refactor
  };

  validateFormInputs = (): boolean => {
    const { captionInput, fileInput } = this.state;
    const captionInputValid = isValidText(captionInput);
    const fileInputValid = isValidImageFile(fileInput);
    const formValid = captionInputValid && fileInputValid;

    if (!formValid) {
      this.setState(
        {
          captionInputValid,
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

  postDish = (): void => {
    const { captionInput } = this.state;
    const { history } = this.props;
    const formDataValid = this.validateFormInputs();

    if (formDataValid) {
      this.S3FileUpload()
        .then((data) => {
          const imageURL = data.location;

          const postData = {
            captionInput,
            imageURL
          };
          postPhoto(postData)
            .then(() => {
              alert(SUCCESSFUL_UPLOAD);
              history.push('/gallery');
            })
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

  S3FileUpload = (): Promise<S3response> => {
    const { fileInput } = this.state;

    return ReactS3.uploadFile(fileInput, S3Config);
  };

  render(): JSX.Element {
    const {
      captionInput,
      captionInputValid,
      fileInputValid,
      showValidations
    } = this.state;

    return (
      <MaterialContainer maxWidth="sm" style={styles.container}>
        <Typography text="New Photo" variant="h4" />
        <TextField
          id="captionInput"
          label="Caption"
          handleInput={this.onInputChange}
          value={captionInput}
          helperText={INVALID_TEXT_INPUT}
          invalid={showValidations && !captionInputValid}
        />
        <MaterialInput
          id="fileInput"
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

export const Upload = withRouter(_Upload);

const styles = {
  container: {}
};
