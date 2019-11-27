import React, { PureComponent } from 'react';
import { PhotoCard } from '..';
import { getPhotos } from '../../api';
import { photo } from '../../types';
import shortid from 'shortid';
import { Typography } from '../Typography';

interface State {
  photos: photo[];
  showCaptionPhotoId: number | undefined;
  editCaptionId: number | undefined;
}

export class Gallery extends PureComponent<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showCaptionPhotoId: undefined,
      editCaptionId: undefined
    };
  }

  componentDidMount(): void {
    getPhotos().then((res) => {
      this.setState({ photos: res.data });
    });
  }

  onPhotoHover = (id): void => {
    this.setState({ showCaptionPhotoId: id });
  };

  onCaptionEdit = (id, input): void => {
    const { photos } = this.state;
    const newPhotos = [...photos];
    const clickedPhoto = newPhotos.find((photo) => photo.id === id);

    if (clickedPhoto) clickedPhoto.caption = input;
    console.log('oncaptionedit', 'id', id);
    this.setState({ photos: newPhotos, editCaptionId: id });
  };

  renderGallery = (): JSX.Element[] => {
    const { photos, showCaptionPhotoId, editCaptionId } = this.state;

    return photos.map(
      (photo: photo): JSX.Element => {
        console.log('render card id', editCaptionId === photo.id);
        return (
          <PhotoCard
            key={shortid.generate()}
            caption={photo.caption}
            imageURL={photo.imageURL}
            id={photo.id}
            onPhotoHover={this.onPhotoHover}
            showCaption={showCaptionPhotoId === photo.id}
            onCaptionEdit={this.onCaptionEdit}
            autoFocus={editCaptionId === photo.id}
          />
        );
      }
    );
  };

  render(): JSX.Element {
    console.log('gallery render', this.state);
    return <div style={styles.container}>{this.renderGallery()}</div>;
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap'
  }
};
