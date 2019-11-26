import React, { PureComponent } from 'react';
import { PhotoCard } from '..';
import { getPhotos } from '../../api';
import { photo } from '../../types';
import shortid from 'shortid';
import { Typography } from '../Typography';

interface State {
  photos: photo[];
  showCaptionPhotoId: number | undefined;
}

export class Gallery extends PureComponent<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showCaptionPhotoId: undefined
    };
  }

  componentDidMount(): void {
    getPhotos().then((res) => {
      this.setState({ photos: res.data });
    });
  }

  onPhotoHover = (id): void => {
    console.log('parent hovered');
    this.setState({ showCaptionPhotoId: id });
  };

  renderGallery = (): JSX.Element[] => {
    const { photos, showCaptionPhotoId } = this.state;

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
          />
        );
      }
    );
  };

  render(): JSX.Element {
    return (
      <div style={styles.container}>
        {/* <Typography text="photos" variant="h4" /> */}
        {this.renderGallery()}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as 'row'
    // width: '100%',
    // justifyContent: 'space-between'
    // flex: 1
  }
};
