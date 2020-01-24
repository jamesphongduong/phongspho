import React, { PureComponent } from 'react';
import { CustomTextField, CustomButton } from '../';
import { Container } from '@material-ui/core';
import {
  stringIsOnlyWhiteSpace,
  checkFileType,
  SUCCESSFUL_UPLOAD,
  alertSuccessful,
  showLoading
} from '../../utils';
import { FILE_UPLOAD_VALIDATION_TEXT, REQUIRED_FIELD_TEXT } from '../../utils';
import ReactS3 from 'react-s3';
import { RouteComponentProps, withRouter } from 'react-router';
import { S3Config } from '../../config';
import { postPhoto } from '../../api';
import { Image } from '../';
import { S3response, fileOrUndefined, InputValidation } from '../../types';

interface _UploadProps {}

interface _UploadState {
  captionInput: string;
  fileInput: fileOrUndefined;
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
    const { captionInput, fileInput } = this.state;
    if (!fileInput) return false;
    const captionInputValid =
      stringIsOnlyWhiteSpace(captionInput) === true ? 'Empty' : 'Valid';
    const fileInputValid = checkFileType(fileInput);
    const formValid =
      captionInputValid === 'Valid' && fileInputValid === 'Valid';

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

  postPhoto = (): void => {
    const { captionInput } = this.state;
    const { history } = this.props;
    const formDataValid = this.validateFormInputs();

    if (formDataValid) {
      showLoading();
      this.S3FileUpload()
        .then((data) => {
          const imageURL = data.location;

          const postData = {
            captionInput,
            imageURL
          };
          postPhoto(postData)
            .then(() => {
              alertSuccessful();
              history.push('/');
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

  renderForm = (): JSX.Element => {
    const {
      captionInput,
      captionInputValid,
      fileInputValid,
      showValidations
    } = this.state;

    return (
      <Container maxWidth="xs">
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
      <div style={styles.contentContainer}>
        <Image src="/upload.svg" alt="upload" />
        {this.renderForm()}
      </div>
    );
  }
}

export const Upload = withRouter(_Upload);

const styles = {
  contentContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    height: '100%'
  }
};
