import React, { Fragment, PureComponent } from 'react';
import { PhotoCard } from '..';
import { getPhotos, putPhoto, deletePhoto } from '../../api';
import shortid from 'shortid';
import { numOrUndefined, Photo, RootState } from '../../types';
import { Fab } from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';
import { filterData } from '../../utils';
import { connect } from 'react-redux';

interface _GalleryProps {
  loggedIn: boolean;
}

interface _GalleryState {
  photos: Photo[];
  editCaptionId: numOrUndefined;
  editMode: boolean;
  editMade: boolean;
  idsEdited: number[];
  idsDeleted: number[];
}

type Props = _GalleryProps & LinkStateProps;

class _Gallery extends PureComponent<Props, _GalleryState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      photos: [],
      editCaptionId: undefined,
      editMode: false,
      editMade: false,
      idsEdited: [],
      idsDeleted: []
    };
  }

  componentDidMount(): void {
    getPhotos().then((res) => {
      this.setState({ photos: res.data });
    });
  }

  onPhotoCaptionEdit = (id: number, input: string): void => {
    const { photos } = this.state;
    const newPhotos = [...photos];
    const clickedPhoto = newPhotos.find((photo) => photo.id === id);

    if (clickedPhoto) clickedPhoto.captionInput = input;
    this.setState({ photos: newPhotos, editCaptionId: id });
  };

  onPhotoDelete = (id: number): void => {
    const { photos } = this.state;
    const newPhotos = [...photos].filter((photo) => photo.id !== id);

    this.setState((prevState) => ({
      photos: newPhotos,
      idsDeleted: [...prevState.idsDeleted, id],
      editMade: true
    }));
  };

  onEditMade = (id: number): void => {
    this.setState((prevState) => ({
      idsEdited: [...prevState.idsEdited, id],
      editMade: true
    }));
  };

  toggleEdit = (): void => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode
    }));
  };

  onSave = async (): Promise<void> => {
    const { idsEdited, idsDeleted, photos } = this.state;
    const idsEditedFiltered = filterData(idsEdited, idsDeleted);

    const editPromises = idsEditedFiltered.map((id) => {
      const photo = photos.find((photo) => photo.id === id);
      if (photo) {
        const { captionInput, imageURL } = photo;
        putPhoto(id, { captionInput, imageURL });
      }
    });

    const deletePromises = idsDeleted.map((id) => {
      deletePhoto(id);
    });

    await Promise.all([editPromises, deletePromises])
      .then((res) => {
        console.log('all promises completed');
        this.setState({
          idsEdited: [],
          idsDeleted: [],
          editMode: false,
          editMade: false
        });
      })
      .catch((err) => console.log('promise err', err));
  };

  renderEditOptions = (): JSX.Element => {
    const { editMode, editMade } = this.state;

    return (
      <Fragment>
        <Fab
          onClick={this.toggleEdit}
          color="secondary"
          aria-label="edit"
          size="medium"
        >
          <Edit />
        </Fab>
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
      </Fragment>
    );
  };

  renderGallery = (): JSX.Element[] => {
    const { photos, editCaptionId, editMode, editMade, idsEdited } = this.state;
    return photos.map(
      (photo: Photo): JSX.Element => {
        return (
          <PhotoCard
            onEditMade={this.onEditMade}
            onCaptionEdit={this.onPhotoCaptionEdit}
            onDeleteMade={this.onPhotoDelete}
            editMode={editMode}
            key={shortid.generate()}
            captionInput={photo.captionInput}
            imageURL={photo.imageURL}
            id={photo.id}
            autoFocus={editCaptionId === photo.id}
          />
        );
      }
    );
  };

  render(): JSX.Element {
    const { loggedIn } = this.props;

    return (
      <div>
        {loggedIn && this.renderEditOptions()}
        <div style={styles.container}>{this.renderGallery()}</div>
      </div>
    );
  }
}

interface LinkStateProps {
  loggedIn: boolean;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    loggedIn: state.adminReducer.loggedIn
  };
};

export const Gallery = connect(mapStateToProps)(_Gallery);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap'
  },
  editContainer: {}
};
