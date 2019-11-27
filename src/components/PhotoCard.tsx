import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { deletePhoto } from '../api';
import { photo } from '../types';
import { Button } from './Button';
import { TextField } from './TextField';

interface Props extends photo {
  onPhotoHover(id): void;
  onCaptionEdit(id, input): void;
  showCaption: boolean;
  autoFocus: boolean;
}

export const PhotoCard = (props: Props): JSX.Element => {
  const {
    caption,
    imageURL,
    id,
    onPhotoHover,
    showCaption,
    onCaptionEdit,
    autoFocus
  } = props;
  const classes = useStyles();

  const onHover = (): void => {
    onPhotoHover(id);
  };

  const onHoverOut = (): void => {
    onPhotoHover(null);
  };

  const onDeleteClick = (): void => {
    deletePhoto(id)
      .then(() => alert('deleted'))
      .catch((err) => alert(err));
  };

  // const renderEditOptions = (): JSX.Element => {
  //   return (
  //     <Fragment>
  //       <Button label="Delete" color="primary" onClick={onDeleteClick} />
  //       <Button label="Edit" color="primary" onClick={onEditClick} />
  //     </Fragment>
  //   );
  // };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;
    console.log('here', value);
    console.log('id', id);
    onCaptionEdit(id, value);
    // this.setState({ [id]: value });
  };

  const handleEditInput = (): void => {};

  return (
    <Card className={classes.card} raised>
      <div onMouseOver={onHover} onMouseOut={onHoverOut}>
        {/* <div
          className={showCaption ? classes.showCaption : classes.hideCaption}
        > */}
        <div className={classes.showCaption}>
          <TextField
            value={caption}
            handleInput={onInputChange}
            autoFocus={autoFocus}
          />
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
    padding: 16,
    overflow: 'visible'
  },
  media: {
    height: 500,
    width: 500
  },
  hideCaption: {
    display: 'none'
  },
  showCaption: {
    display: 'flex',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    //
    flexDirection: 'column'
  }
});
