import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { Card, CardMedia, Fab, TextField } from '@material-ui/core';
import { CustomTextField } from './';
import { Photo, numOrNull, RootState } from '../types';
import { putPhoto } from '../api';
import {
  updateHoveredPhotoId,
  removeHoveredPhotoId,
  toggleEdit
} from '../redux/actions';
import { connect } from 'react-redux';
import { alertConfirm, alertSuccessful } from '../utils';

interface PhotoProps extends Photo {
  editMode: boolean;
  onCaptionEdit: (id: number, input: string) => void;
  autoFocus: boolean;
  toggleEdit: () => void;
  onEditMade: (id: number) => void;
  onDeleteMade: (id: number) => void;
}

type Props = PhotoProps & linkStateProps;

const _PhotoCard = (props: Props): JSX.Element => {
  const {
    captionInput,
    imageURL,
    id,
    onCaptionEdit,
    autoFocus,
    editMode,
    onEditMade,
    onDeleteMade
  } = props;
  const classes = useStyles();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;
    if (id) {
      onCaptionEdit(id, value);
      onEditMade(id);
    }
  };

  const onDelete = (): void => {
    if (id) onDeleteMade(id);
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
          // onEditMade(false, id);
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
      <div>
        <div className={editMode ? classes.editButtonContainer : classes.hide}>
          {renderDeleteButton()}
        </div>
        <CardMedia className={classes.media} image={imageURL} />
      </div>
      <CustomTextField
        style={{ marginBottom: '0px' }}
        id="captionInput"
        fullWidth
        multiline
        value={captionInput}
        handleInput={onInputChange}
        autoFocus={autoFocus}
        InputProps={
          !editMode
            ? {
                readOnly: true,
                disableUnderline: true
              }
            : {}
        }
        maxLength="2"
      />
    </Card>
  );
};

const actionCreators = {
  updateHoveredPhotoId,
  removeHoveredPhotoId,
  toggleEdit
};

interface linkStateProps {
  photoIdHovered: numOrNull;
}

const mapStateToProps = (state: RootState): linkStateProps => {
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
      position: 'relative',
      margin: 16,
      padding: 16,
      overflow: 'visible',
      alignSelf: 'flex-start'
    },
    media: {
      minHeight: 350,
      minWidth: 350
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
