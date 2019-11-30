import React, { Fragment, PureComponent } from 'react';
import { PhotoCard } from '..';
import { getPhotos, putPhoto } from '../../api';
import { Photo } from '../../types';
import shortid from 'shortid';
import { numOrUndefined } from '../../types';
import { Fab } from '@material-ui/core';
import { Edit, Delete, Save } from '@material-ui/icons';

interface State {
  photos: Photo[];
  editCaptionId: numOrUndefined;
  editMode: boolean;
  editMade: boolean;
  idsEdited: any;
}

export class Gallery extends PureComponent<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      editCaptionId: undefined,
      editMode: false,
      editMade: false,
      idsEdited: []
    };
  }

  componentDidMount(): void {
    getPhotos().then((res) => {
      this.setState({ photos: res.data });
    });
  }

  onCaptionEdit = (id: number, input: string): void => {
    const { photos } = this.state;
    const newPhotos = [...photos];
    const clickedPhoto = newPhotos.find((photo) => photo.id === id);

    if (clickedPhoto) clickedPhoto.captionInput = input;
    this.setState({ photos: newPhotos, editCaptionId: id });
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode
    }));
  };

  onSave = () => {
    const { idsEdited, photos } = this.state;
    console.log('here', idsEdited, photos);
    idsEdited.map((id) => {
      const photo = photos.find((photo) => photo.id === id);
      if (photo) {
        const { captionInput, imageURL } = photo;
        putPhoto(id, { captionInput, imageURL }).then(() => {
          console.log('done');
          this.setState({ idsEdited: [] });
        });
      }
      // putPhoto(id, newData);
    });
  };

  renderEditOptions = (): JSX.Element => {
    const { editMode, editMade } = this.state;

    return (
      <Fragment>
        {editMode && editMade && (
          <Fab
            onClick={this.onSave}
            color="secondary"
            aria-label="save"
            size="medium"
          >
            <Save />
          </Fab>
        )}
        <Fab
          onClick={this.toggleEdit}
          color="secondary"
          aria-label="edit"
          size="medium"
        >
          <Edit />
        </Fab>
      </Fragment>
    );
  };

  onEditMade = (value: boolean, id: number): void => {
    this.setState((prevState) => ({
      idsEdited: [...prevState.idsEdited, id],
      editMade: value
    }));
  };

  renderGallery = (): JSX.Element[] => {
    const { photos, editCaptionId, editMode, editMade, idsEdited } = this.state;
    return photos.map(
      (photo: Photo): JSX.Element => {
        return (
          <PhotoCard
            onEditMade={this.onEditMade}
            editMode={editMode}
            key={shortid.generate()}
            captionInput={photo.captionInput}
            imageURL={photo.imageURL}
            id={photo.id}
            onCaptionEdit={this.onCaptionEdit}
            autoFocus={editCaptionId === photo.id}
          />
        );
      }
    );
  };

  render(): JSX.Element {
    console.log('state', this.state);
    return (
      <div style={styles.container}>
        {this.renderEditOptions()}
        {this.renderGallery()}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap'
  }
};
