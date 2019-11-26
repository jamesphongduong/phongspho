import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { deletePhoto } from '../api';
import { photo } from '../types';

interface Props extends photo {
  onPhotoHover(id): void;
  showCaption: boolean;
}

export const PhotoCard = (props: Props): JSX.Element => {
  const { caption, imageURL, id, onPhotoHover, showCaption } = props;
  const classes = useStyles();

  const onHover = (): void => {
    onPhotoHover(id);
  };

  const onHoverOut = (): void => {
    onPhotoHover(null);
  };

  const onDeleteClick = (): void => {
    const { id } = props;

    deletePhoto(id)
      .then(() => alert('deleted'))
      .catch((err) => alert(err));
  };

  return (
    <Card className={classes.card} raised>
      <div onMouseOver={onHover} onMouseOut={onHoverOut}>
        <div
          className={showCaption ? classes.showCaption : classes.hideCaption}
        >
          {caption}
        </div>
        <CardMedia className={classes.media} image={imageURL} />
      </div>
    </Card>
  );
};

const useStyles = makeStyles({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    // maxWidth: 345
    position: 'relative',
    margin: 16,
    padding: 16
  },
  media: {
    // height: 140
    // height:
    minHeight: 300,
    minWidth: 300
  },
  hideCaption: {
    display: 'none'
  },
  showCaption: {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
});
