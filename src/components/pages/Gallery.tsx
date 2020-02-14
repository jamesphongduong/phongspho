import React, { Fragment, PureComponent } from 'react';
import { PhotoCard, AppContextConsumer } from '..';
import { getPhotos, putPhoto, deletePhoto, getAlbums } from '../../api';
import shortid from 'shortid';
import { numOrUndefined, Photo } from '../../types';
import { Fab, Tabs, Tab } from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';
import { filterArray, alertSuccessful, updateArray } from '../../utils';

interface State {
  photos: Photo[];
  editCaptionId: numOrUndefined;
  editMode: boolean;
  editMade: boolean;
  idsEdited: number[];
  idsDeleted: number[];
  albumSelected: number;
  albums: string[];
}

interface Props {}

export class Gallery extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      photos: [],
      editCaptionId: undefined,
      editMode: false,
      editMade: false,
      idsEdited: [],
      idsDeleted: [],
      albums: [],
      albumSelected: 0
    };
  }

  componentDidMount(): void {
    getPhotos().then((res) => {
      console.log('res', res);
      this.setState({ photos: res.data });
    });
    getAlbums().then((res) => this.setState({ albums: res.data.sort() }));
  }

  onPhotoEdit = (id: number, album: string): void => {
    const args = { matcher: id, newValue: album, prop: 'album' };
    const updatedPhotoList = updateArray(this.state.photos, args);

    this.setState((prevState) => ({
      photos: updatedPhotoList,
      editMade: true,
      idsEdited: [...prevState.idsEdited, id]
    }));
  };

  onPhotoCaptionEdit = (id: number, input: string): void => {
    const { photos } = this.state;
    const newPhotos = [...photos];
    const clickedPhoto = newPhotos.find((photo) => photo.id === id);

    if (clickedPhoto) clickedPhoto.caption = input;
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
    const idsEditedFiltered = filterArray(idsEdited, idsDeleted);
    const editPromises = idsEditedFiltered.map((id) => {
      const photo = photos.find((photo) => photo.id === id);
      if (photo) {
        const { caption, imageURL, album } = photo;
        return putPhoto(id, { caption, imageURL, album });
      }
      return null;
    });

    const deletePromises = idsDeleted.map((id) => {
      return deletePhoto(id);
    });

    await Promise.all([editPromises, deletePromises])
      .then((res) => {
        alertSuccessful('Changes successful.');
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

  renderAlbumOptions = (): JSX.Element => {
    const { albumSelected, albums } = this.state;
    return (
      <Tabs
        value={albumSelected}
        onChange={(e, newValue) => this.setState({ albumSelected: newValue })}
        aria-label="simple tabs example"
        style={styles.tabsContainer}
      >
        {albums.map((option) => (
          <Tab label={option} key={shortid.generate()} />
        ))}
      </Tabs>
    );
  };

  renderGallery = (): JSX.Element[] => {
    const {
      photos,
      editCaptionId,
      editMode,
      albumSelected,
      albums
    } = this.state;

    const filteredPhotos = photos.filter(
      (photo) => photo.album === albums[albumSelected]
    );

    return filteredPhotos.map(
      (photo: Photo): JSX.Element => {
        return (
          <PhotoCard
            onEditMade={this.onEditMade}
            onCaptionEdit={this.onPhotoCaptionEdit}
            onDeleteMade={this.onPhotoDelete}
            editMode={editMode}
            key={shortid.generate()}
            caption={photo.caption}
            imageURL={photo.imageURL}
            id={photo.id}
            autoFocus={editCaptionId === photo.id}
            album={photo.album}
            onEdit={this.onPhotoEdit}
          />
        );
      }
    );
  };

  render(): JSX.Element {
    return (
      <AppContextConsumer>
        {(context) => (
          <Fragment>
            {context && context.state.loggedIn && this.renderEditOptions()}
            {this.renderAlbumOptions()}
            <div style={styles.container}>{this.renderGallery()}</div>
          </Fragment>
        )}
      </AppContextConsumer>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  tabsContainer: {
    margin: 16
  }
};
