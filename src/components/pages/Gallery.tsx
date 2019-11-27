import React, { PureComponent } from 'react';
import { PhotoCard } from '..';
import { getPhotos } from '../../api';
import { photo } from '../../types';
import shortid from 'shortid';
import { numOrUndefined } from '../../types';

interface State {
  photos: photo[];
  showCaptionPhotoId: numOrUndefined;
  editCaptionId: numOrUndefined;
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

  onPhotoHover = (id: number): void => {
    this.setState({ showCaptionPhotoId: id });
  };

  onCaptionEdit = (id: number, input: string): void => {
    const { photos } = this.state;
    const newPhotos = [...photos];
    const clickedPhoto = newPhotos.find((photo) => photo.id === id);

    if (clickedPhoto) clickedPhoto.caption = input;
    this.setState({ photos: newPhotos, editCaptionId: id });
  };

  renderGallery = (): JSX.Element[] => {
    const { photos, showCaptionPhotoId, editCaptionId } = this.state;

    return photos.map(
      (photo: photo): JSX.Element => {
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
