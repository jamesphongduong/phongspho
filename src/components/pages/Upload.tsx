import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import shortid from 'shortid';
import { PhotoCard } from '..';
import { updateArray } from '../../utils';

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
      id: shortid.generate(),
      caption: '',
      album: '',
      url: URL.createObjectURL(file)
    }));
    console.log('files', files);
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

  render() {
    console.log('render');
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
