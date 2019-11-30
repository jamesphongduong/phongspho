import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Edit, Delete, Save } from '@material-ui/icons';
import { Card, CardMedia, Fab, TextField } from '@material-ui/core';
import { deletePhoto } from '../api';
import { Photo, numOrNull } from '../types';
import { Button } from './Button';
// import { TextField } from './TextField';
import { putPhoto } from '../api';
import {
  updateHoveredPhotoId,
  removeHoveredPhotoId,
  toggleEdit
} from '../redux/actions';
import { connect } from 'react-redux';
import { alertConfirm, alertSuccessful } from '../utils';

interface Props extends Photo {
  editMode: boolean;
  onPhotoHover(id: numOrNull): void;
  onCaptionEdit(id: number, input: string): void;
  showCaption: boolean;
  autoFocus: boolean;
  updateHoveredPhotoId(id: number): void;
  removeHoveredPhotoId(): void;
  photoIdHovered: numOrNull;
  toggleEdit(): any;
  onEditMade(value: boolean): void;
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
    photoIdHovered,
    toggleEdit,
    editMode,
    onEditMade
  } = props;
  const classes = useStyles();

  const onHover = (): void => {
    if (id) updateHoveredPhotoId(id);
  };

  const onHoverOut = (): void => {
    removeHoveredPhotoId();
  };

  const onDelete = (): void => {
    alertConfirm().then((result) => {
      if (result.value) {
        if (id) {
          deletePhoto(id)
            .then(() => alertSuccessful())
            .catch((err) => alert(err));
        }
      }
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;
    if (id) {
      onCaptionEdit(id, value);
      onEditMade(true);
    }
  };

  const onSave = (): void => {
    const postData = {
      imageURL,
      captionInput
    };
    if (id) {
      putPhoto(id, postData)
        .then(() => {
          alert('putted');
          onEditMade(false);
        })
        .catch((err) => alert(err));
    }
  };

  const renderDeleteButton = (): JSX.Element => {
    return (
      <Fab
        onClick={onDelete}
        color="secondary"
        aria-label="delete"
        size="medium"
      >
        <Delete />
      </Fab>
    );
  };

  return (
    <Card className={classes.card} raised>
      <div onMouseOver={onHover} onMouseOut={onHoverOut}>
        <div
          className={
            photoIdHovered === id && editMode
              ? classes.editButtonContainer
              : classes.hide
          }
        >
          {renderDeleteButton()}
        </div>
        <CardMedia className={classes.media} image={imageURL} />
      </div>
      <TextField
        id="captionInput"
        value={captionInput}
        // handleInput={onInputChange}
        onChange={onInputChange}
        autoFocus={autoFocus}
        InputProps={
          !editMode
            ? {
                readOnly: true,
                disableUnderline: true
              }
            : {}
        }
      />
    </Card>
  );
};

const actionCreators = {
  updateHoveredPhotoId,
  removeHoveredPhotoId,
  toggleEdit
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
    editButtonContainer: {
      position: 'absolute',
      right: '25px',
      top: '25px'
      // display: 'flex',
      // position: 'absolute',
      // left: '50%',
      // top: '50%',
      // transform: 'translate(-50%, -50%)',
      //
      // flexDirection: 'column'
    },
    hide: {
      display: 'none'
    }
  })
);
