import React, { PureComponent } from 'react';
import { PhotoCard } from '..';
import { getPhotos } from '../../api';
import { photo } from '../../types';
import shortid from 'shortid';
import { Typography } from '../Typography';

interface State {
  photos: photo[];
}

export class Gallery extends PureComponent<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentDidMount(): void {
    getPhotos().then((res) => {
      this.setState({ photos: res.data });
    });
  }

  renderGallery = (): JSX.Element[] => {
    const { photos } = this.state;

    return photos.map(
      (photo: photo): JSX.Element => {
        return (
          <PhotoCard
            key={shortid.generate()}
            caption={photo.caption}
            imageURL={photo.imageURL}
            id={photo.id}
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
