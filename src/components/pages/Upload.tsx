import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import shortid from 'shortid';
import { PhotoCard } from '..';

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
            // autoFocus
            onDeleteMade={this.onPhotoDelete}
            imageURL={URL.createObjectURL(file.file)}
            album=""
            onEdit={() => {}} //tofix
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
