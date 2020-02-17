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
import SweetAlert from 'sweetalert2';

interface UploadProps {}

interface UploadState {
  files: any[];
}

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
    console.log('renderUploadItems');
    const { files } = this.state;
    console.log('state', files);
    return files.map((file) => {
      console.log('file', file);
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
        console.log('res', res);
        console.log('posting to backend');
        const fileList = files.map(({ caption, album, id }, index) => {
          return {
            caption,
            album,
            id,
            imageURL: res[index].location
          };
        });
        console.log('fileList', fileList);
        const promises2 = fileList.map((file) => postPhoto(file));
        Promise.all(promises2)
          .then((res) => {
            console.log('dbres', res);
            SweetAlert.close();
          })
          .catch((err) => console.log('err', err));
      })
      .catch((err) => console.log('err', err));
  };

  render() {
    console.log('render');
    return (
      <div style={styles.container}>
        <div>
          <Dropzone onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div style={styles.uploadArea} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <div style={styles.uploadsContainer}>{this.renderUploadItems()}</div>
          <CustomButton
            onClick={this.S3FileUpload}
            color="secondary"
            label="Upload files"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  uploadsContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    alignItems: 'center'
  },
  upload: {
    margin: 16
  },
  uploadArea: {
    border: '1px solid black',
    height: 400,
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    border: '1px solid purple'
    // display: 'flex',
    // // flexDirection: 'column' as 'column',
    // justifyContent: 'center'
    // // alignItems: 'center'
  }
};
