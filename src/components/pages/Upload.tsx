// import React, { PureComponent } from 'react';
// import { Typography } from '@material-ui/core';
// import { CustomTextField, CustomButton } from '../';
// import { Container, Box } from '@material-ui/core';
// import {
//   stringIsOnlyWhiteSpace,
//   checkFileType,
//   alertSuccessful,
//   showLoading
// } from '../../utils';
// import { FILE_UPLOAD_VALIDATION_TEXT, REQUIRED_FIELD_TEXT } from '../../utils';
// import ReactS3 from 'react-s3';
// import { app } from '../../styles';
// import { RouteComponentProps, withRouter } from 'react-router';
// import { S3Config } from '../../config';
// import { postPhoto } from '../../api';
// import { Image } from '../';
// import { S3response, fileOrUndefined, InputValidation } from '../../types';

// interface _UploadProps {}

// interface _UploadState {
//   caption: string;
//   fileInput: fileOrUndefined;
//   album: string;
//   captionValid: InputValidation;
//   fileInputValid: InputValidation;
//   albumValid: InputValidation;
//   showValidations: boolean;
//   show: boolean;
// }

// type Props = _UploadProps & RouteComponentProps<{}>;

// class _Upload extends PureComponent<Props, _UploadState> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       caption: '',
//       album: '',
//       fileInput: undefined,
//       captionValid: 'Empty',
//       fileInputValid: 'Empty',
//       albumValid: 'Empty',
//       showValidations: false,
//       show: true
//     };
//   }

//   onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const {
//       target: { id, value }
//     } = e;
//     this.setState({ [id]: value } as any); // possible refactor
//   };

//   validateFormInputs = (): boolean => {
//     console.log('validating form');
//     const { caption, fileInput, album } = this.state;

//     const fileInputValid = fileInput ? checkFileType(fileInput) : 'Empty';
//     const captionValid = stringIsOnlyWhiteSpace(caption) ? 'Empty' : 'Valid';
//     const albumValid = stringIsOnlyWhiteSpace(album) ? 'Empty' : 'Valid';

//     if (
//       captionValid === 'Valid' &&
//       fileInputValid === 'Valid' &&
//       albumValid === 'Valid'
//     ) {
//       return true;
//     }
//     this.setState({ fileInputValid, captionValid, albumValid }, () => {
//       this.setState({ showValidations: true });
//     });
//     return false;
//   };

//   postPhoto = (): void => {
//     const { caption, album } = this.state;
//     const { history } = this.props;
//     const formDataValid = this.validateFormInputs();
//     if (formDataValid) {
//       showLoading();
//       this.S3FileUpload()
//         .then((data) => {
//           const imageURL = data.location;

//           const postData = {
//             caption,
//             imageURL,
//             album
//           };
//           postPhoto(postData)
//             .then(() => {
//               alertSuccessful('Successfully uploaded.');
//               history.push('/');
//             })
//             .catch((err) => alert(err));
//         })
//         .catch((err) => console.log('err', err));
//     }
//     console.log('failed');
//   };

//   localFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     if (e && e.target && e.target.files) {
//       this.setState({ fileInput: e.target.files[0] });
//     }
//   };

//   S3FileUpload = (): Promise<S3response> => {
//     const { fileInput } = this.state;

//     return ReactS3.uploadFile(fileInput, S3Config);
//   };

//   renderForm = (): JSX.Element => {
//     const {
//       caption,
//       captionValid,
//       album,
//       albumValid,
//       fileInputValid,
//       showValidations
//     } = this.state;

//     return (
//       <Container maxWidth="xs" style={{ padding: 0 }}>
//         <CustomTextField
//           id="caption"
//           label="Caption"
//           handleInput={this.onInputChange}
//           value={caption}
//           helperText={REQUIRED_FIELD_TEXT}
//           invalid={showValidations && captionValid !== 'Valid'}
//         />
//         <CustomTextField
//           label="File"
//           id="fileInput"
//           type="file"
//           helperText={
//             fileInputValid === 'Empty'
//               ? REQUIRED_FIELD_TEXT
//               : FILE_UPLOAD_VALIDATION_TEXT
//           }
//           invalid={showValidations && fileInputValid !== 'Valid'}
//           required
//           handleInput={this.localFileUpload}
//         />
//         <CustomTextField
//           id="album"
//           label="Album"
//           handleInput={this.onInputChange}
//           value={album}
//           helperText={REQUIRED_FIELD_TEXT}
//           invalid={showValidations && albumValid !== 'Valid'}
//         />
//         <CustomButton
//           onClick={this.postPhoto}
//           color="secondary"
//           label="Submit"
//           fullWidth
//         />
//       </Container>
//     );
//   };

//   render(): JSX.Element {
//     return (
//       <Box px={16} style={app.splitContainer}>
//         <Image src="/upload.svg" alt="upload" />
//         <div>
//           <Typography variant="h2" gutterBottom style={app.headingStyle}>
//             Upload
//           </Typography>
//           {this.renderForm()}
//         </div>
//       </Box>
//     );
//   }
// }

// export const Upload = withRouter(_Upload);

import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import shortid from 'shortid';
import { Image, PhotoCard } from '..';

interface UploadProps {}

interface UploadState {
  files: any[];
}

const dummyFile = new File([''], 'filename');

export class Upload extends PureComponent<UploadProps, UploadState> {
  constructor(props: UploadProps) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop = (acceptedFiles): void => {
    console.log('acceptedFiles', acceptedFiles);
    const files = acceptedFiles.map((file) => ({
      file,
      id: shortid.generate(),
      caption: ''
    }));
    console.log('files', files);
    this.setState((prevState) => ({
      files: [...prevState.files, ...files]
    }));
  };

  onPhotoCaptionEdit = (id: number | string, caption: string): void => {
    console.log('executing');
    console.log('id', id);
    console.log('caption', caption);
    const { files } = this.state;
    const selectedFile = files.find((file) => file.id === id);
    const selectedFileIndex = files.findIndex((file) => file.id === id);
    const editedFile = { ...selectedFile, caption };
    let newFileList = [...files];
    newFileList[selectedFileIndex] = editedFile;
    this.setState({ files: newFileList });
  };

  onPhotoDelete = (id: number | string): void => {
    const { files } = this.state;
    this.setState({ files: [...files.filter((file) => file.id !== id)] });
  };

  renderUploadItems = (): JSX.Element[] | JSX.Element => {
    console.log('renderUploadItems');
    const { files } = this.state;
    console.log('state', files);
    if (files.length < 1) {
      return <div> loading</div>;
    }
    return files.map((file) => {
      console.log('file', file);
      return (
        <div style={styles.upload} key={shortid.generate()}>
          {file.name}
          {/* <Image src={URL.createObjectURL(file)} alt="" size="banner" /> */}
          <PhotoCard
            id={file.id}
            editMode
            caption={file.caption}
            autoFocus
            onCaptionEdit={this.onPhotoCaptionEdit}
            // toggleEdit={() => {}}
            onEditMade={() => {}}
            onDeleteMade={this.onPhotoDelete}
            imageURL={URL.createObjectURL(file.file)}
            album=""
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Dropzone onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={styles.uploadArea}>
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        files
        <div style={styles.uploadsContainer}>{this.renderUploadItems()}</div>
      </div>
    );
  }
}

const styles = {
  uploadsContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    border: '1px solid black',
    alignItems: 'center'
  },
  upload: {
    margin: 16
  },
  uploadArea: {
    border: '1px solid black'
  }
};
