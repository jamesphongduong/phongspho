import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import { CustomTextField, CustomButton } from '../';
import { Container, Box } from '@material-ui/core';
import {
  stringIsOnlyWhiteSpace,
  checkFileType,
  SUCCESSFUL_UPLOAD,
  alertSuccessful,
  showLoading
} from '../../utils';
import { FILE_UPLOAD_VALIDATION_TEXT, REQUIRED_FIELD_TEXT } from '../../utils';
import ReactS3 from 'react-s3';
import { app } from '../../styles';
import { RouteComponentProps, withRouter } from 'react-router';
import { S3Config } from '../../config';
import { postPhoto } from '../../api';
import { Image } from '../';
import { S3response, fileOrUndefined, InputValidation } from '../../types';

interface _UploadProps {}

interface _UploadState {
  captionInput: string;
  fileInput: fileOrUndefined;
  album: string;
  captionInputValid: InputValidation;
  fileInputValid: InputValidation;
  showValidations: boolean;
  show: boolean;
}

type Props = _UploadProps & RouteComponentProps<{}>;

class _Upload extends PureComponent<Props, _UploadState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      captionInput: '',
      album: '',
      fileInput: undefined,
      captionInputValid: 'Empty',
      fileInputValid: 'Empty',
      showValidations: false,
      show: true
    };
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value } as any); // possible refactor
  };

  validateFormInputs = (): boolean => {
    console.log('validating form');
    const {
      captionInput,
      captionInputValid,
      fileInput,
      fileInputValid
    } = this.state;
    this.setState({
      captionInputValid: stringIsOnlyWhiteSpace(captionInput)
        ? 'Empty'
        : 'Valid'
    });
    if (fileInput)
      this.setState({
        fileInputValid: checkFileType(fileInput)
      });
    if (captionInputValid !== 'Valid' && fileInputValid !== 'Valid') {
      this.setState({ showValidations: true });
      return false;
    }
    return true;
  };

  postPhoto = (): void => {
    const { captionInput, album } = this.state;
    const { history } = this.props;
    const formDataValid = this.validateFormInputs();
    console.log('form data valid', formDataValid);
    if (formDataValid) {
      showLoading();
      this.S3FileUpload()
        .then((data) => {
          const imageURL = data.location;

          const postData = {
            captionInput,
            imageURL,
            album
          };
          postPhoto(postData)
            .then(() => {
              alertSuccessful('Successfully uploaded.');
              history.push('/');
            })
            .catch((err) => alert(err));
        })
        .catch((err) => console.log('err', err));
    }
    console.log('failed');
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

  renderForm = (): JSX.Element => {
    const {
      captionInput,
      captionInputValid,
      fileInputValid,
      showValidations
    } = this.state;

    return (
      <Container maxWidth="xs" style={{ padding: 0 }}>
        <CustomTextField
          id="captionInput"
          label="Caption"
          handleInput={this.onInputChange}
          value={captionInput}
          helperText={REQUIRED_FIELD_TEXT}
          invalid={showValidations && captionInputValid !== 'Valid'}
        />
        <CustomTextField
          label="File"
          id="fileInput"
          type="file"
          helperText={
            fileInputValid === 'Empty'
              ? REQUIRED_FIELD_TEXT
              : FILE_UPLOAD_VALIDATION_TEXT
          }
          invalid={showValidations && fileInputValid !== 'Valid'}
          required
          handleInput={this.localFileUpload}
        />
        <CustomButton
          onClick={this.postPhoto}
          color="secondary"
          label="Submit"
          fullWidth
        />
      </Container>
    );
  };

  render(): JSX.Element {
    return (
      <Box px={16} style={app.splitContainer}>
        <Image src="/upload.svg" alt="upload" />
        <div>
          <Typography variant="h2" gutterBottom style={app.headingStyle}>
            Upload
          </Typography>
          {this.renderForm()}
        </div>
      </Box>
    );
  }
}

export const Upload = withRouter(_Upload);
