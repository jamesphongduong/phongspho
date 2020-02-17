import React, { PureComponent } from 'react';
import { CustomButton } from '../';
import Dropzone from 'react-dropzone';
import ReactS3 from 'react-s3';
import shortid from 'shortid';
import { PhotoCard } from '..';
import { updateArray, showLoading } from '../../utils';
import { postPhoto } from '../..//api';
import { S3response } from '../../types';
import { S3Config } from '../../config';
import { Typography } from '@material-ui/core';
import SweetAlert from 'sweetalert2';
import { app } from '../../styles';

interface Props {}

interface State {
  files: any[];
}

export class Upload extends PureComponent<Props, State> {
  constructor(props: Props) {
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
      caption: '',
      album: 'Random',
      url: URL.createObjectURL(file)
    }));
    this.setState((prevState) => ({
      files: [...prevState.files, ...files]
    }));
  };

  onPhotoEdit = (id: number, prop: string, newValue: string): void => {
    const args = { matcher: id, newValue, prop };
    const updatedFileList = updateArray(this.state.files, args);

    this.setState({
      files: updatedFileList
    });
  };

  onPhotoDelete = (id: number | string): void => {
    const { files } = this.state;
    this.setState({ files: [...files.filter((file) => file.id !== id)] });
  };

  renderUploadItems = (): JSX.Element[] => {
    const { files } = this.state;

    return files.map((file) => {
      return (
        <div style={styles.upload} key={file.id}>
          {file.name}
          <PhotoCard
            id={file.id}
            editMode
            caption={file.caption}
            onDeleteMade={this.onPhotoDelete}
            imageURL={file.url}
            album={file.album}
            onEdit={this.onPhotoEdit} //tofix
          />
        </div>
      );
    });
  };

  S3FileUpload = (): any => {
    const { files } = this.state;

    showLoading('Uploading files');
    const promises = files.map((file) => {
      return ReactS3.uploadFile(file.file, S3Config);
    });

    Promise.all(promises)
      .then((res) => {
        const fileList = files.map(({ caption, album, id }, index) => {
          return {
            caption,
            album,
            id,
            imageURL: res[index].location
          };
        });
        const promises2 = fileList.map((file) => postPhoto(file));
        Promise.all(promises2)
          .then((res) => {
            SweetAlert.close();
          })
          .catch((err) => console.warn('err', err));
      })
      .catch((err) => console.warn('err', err));
  };

  render() {
    const { files } = this.state;

    return (
      <div style={styles.container}>
        <Typography variant="h2" gutterBottom style={app.headingStyle}>
          Upload
        </Typography>
        <div>
          <Dropzone onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div style={styles.uploadArea} {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={styles.dragText}>
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            )}
          </Dropzone>
          {files.length !== 0 && (
            <CustomButton
              style={styles.button}
              fullWidth
              onClick={this.S3FileUpload}
              color="secondary"
              label="Upload files"
            />
          )}
        </div>

        <div style={styles.uploadsContainer}>{this.renderUploadItems()}</div>
      </div>
    );
  }
}

const styles = {
  uploadsContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    paddingHorizontal: 16,
    flexWrap: 'wrap' as 'wrap',
    width: '100%'
    // alignItems: 'center'
  },
  dragText: {
    textAlign: 'center' as 'center'
  },
  upload: {
    margin: 16
  },
  uploadArea: {
    border: '1px solid black',
    borderRadius: 4,
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center'
  },
  button: {
    marginTop: 16
  }
};
