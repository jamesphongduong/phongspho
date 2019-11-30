import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Card, CardMedia, Fab } from '@material-ui/core';
import { deletePhoto } from '../api';
import { Photo, numOrNull } from '../types';
import { Button } from './Button';
import { TextField } from './TextField';
import { putPhoto } from '../api';
import { updateHoveredPhotoId, removeHoveredPhotoId } from '../redux/actions';
import { connect } from 'react-redux';

interface Props extends Photo {
  onPhotoHover(id: numOrNull): void;
  onCaptionEdit(id: number, input: string): void;
  showCaption: boolean;
  autoFocus: boolean;
  updateHoveredPhotoId(id: number): void;
  removeHoveredPhotoId(): void;
  photoIdHovered: numOrNull;
}

const _PhotoCard = (props: Props): JSX.Element => {
  const {
    captionInput,
    imageURL,
    id,
    onPhotoHover,
    showCaption,
    onCaptionEdit,
    autoFocus,
    updateHoveredPhotoId,
    removeHoveredPhotoId,
    photoIdHovered
  } = props;
  const classes = useStyles();

  const onHover = (): void => {
    if (id) updateHoveredPhotoId(id);
  };

  const onHoverOut = (): void => {
    removeHoveredPhotoId();
  };

  const onDelete = (): void => {
    if (id) {
      deletePhoto(id)
        .then(() => alert('deleted'))
        .catch((err) => alert(err));
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;
    if (id) onCaptionEdit(id, value);
  };

  const onSave = (): void => {
    const postData = {
      imageURL,
      captionInput
    };
    if (id) {
      putPhoto(id, postData)
        .then(() => alert('putted'))
        .catch((err) => alert(err));
    }
  };

  const renderEditButton = (): JSX.Element => {
    return (
      <Fab
        onClick={() => console.log('cheers')}
        color="secondary"
        aria-label="edit"
      >
        <Edit />
      </Fab>
    );
  };

  return (
    <Card className={classes.card} raised>
      <div onMouseOver={onHover} onMouseOut={onHoverOut}>
        <div
          className={
            photoIdHovered === id ? classes.showCaption : classes.hideCaption
          }
        >
          {renderEditButton()}
          {/* <TextField
            id="captionInput"
            value={captionInput}
            handleInput={onInputChange}
            autoFocus={autoFocus}
          />
          <Button label="Save caption" color="primary" onClick={onSave} />
          <Button label="Delete photo" color="primary" onClick={onDelete} /> */}
        </div>
        <CardMedia className={classes.media} image={imageURL} />
      </div>
    </Card>
  );
};

const actionCreators = {
  updateHoveredPhotoId,
  removeHoveredPhotoId
};

const mapStateToProps = (state) => {
  return {
    photoIdHovered: state.galleryReducer.photoIdHovered
  };
};

export const PhotoCard = connect(mapStateToProps, actionCreators)(_PhotoCard);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);
