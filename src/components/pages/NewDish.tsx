import React, { PureComponent } from 'react';
import { TextField, Button, Typography } from '../';
import Container from '@material-ui/core/Container';
import { Input } from '@material-ui/core';
import { isValidText, isValidPrice, isValidImageFile } from '../../utils';
import { INVALID_PRICE_INPUT, INVALID_TEXT_INPUT } from '../../utils/';
import ReactS3 from 'react-s3';
import { S3Config } from '../../config';
import { getMeals, postMeal } from '../../api';

interface State {
  titleInput: string;
  priceInput: string;
  descriptionInput: string;
  fileInput: File | undefined;
  [key: string]: string | File | undefined | boolean; // need to refactor
  titleInputValid: boolean;
  priceInputValid: boolean;
  fileInputValid: boolean;
  descriptionInputValid: boolean;
}

export class NewDish extends PureComponent<{}, State> {
  state = {
    titleInput: '',
    priceInput: '',
    descriptionInput: '',
    fileInput: undefined,
    titleInputValid: false,
    priceInputValid: false,
    fileInputValid: false,
    descriptionInputValid: false,
    showValidations: false
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value });
  };

  componentDidMount() {}

  validateFormInputs = (): boolean => {
    const { titleInput, priceInput, descriptionInput, fileInput } = this.state;

    const titleInputValid = isValidText(titleInput);
    const priceInputValid = isValidPrice(priceInput);
    const descriptionInputValid = isValidText(descriptionInput);
    const fileInputValid = isValidImageFile(fileInput);

    const formValid =
      titleInputValid &&
      priceInputValid &&
      descriptionInputValid &&
      fileInputValid;
    console.log('formValid', formValid);

    if (!formValid) {
      this.setState(
        { titleInputValid: titleInputValid, showValidations: true },
        () => {
          setInterval(() => this.setState({ showValidations: false }), 2000);
        }
      );
      return false;
    }
    return true;
  };

  postDish = () => {
    const { titleInput, descriptionInput, priceInput } = this.state;
    const formDataValid = this.validateFormInputs();

    if (formDataValid) {
      console.log('uploading to s3');
      this.S3FileUpload()
        .then((data: any) => {
          console.log('data', data);
          const imageURL = data.location;

          const postData = {
            titleInput,
            descriptionInput,
            priceInput,
            imageURL
          };
          postMeal(postData)
            .then(() => alert('meal posted'))
            .catch((err) => alert(err));
        })
        .catch((err) => console.log('err', err));
    }
  };

  localFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e && e.target && e.target.files) {
      this.setState({ fileInput: e.target.files[0] });
    }
  };

  S3FileUpload = (): any => {
    const { fileInput } = this.state;

    return ReactS3.uploadFile(fileInput, S3Config);
  };

  render(): JSX.Element {
    const {
      titleInput,
      priceInput,
      descriptionInput,
      titleInputValid,
      priceInputValid,
      descriptionInputValid,
      fileInputValid,
      showValidations
    } = this.state;

    console.log('RENDER', this.state);
    return (
      <Container maxWidth="sm">
        <Typography text="New Menu Item" variant="h4" />
        <TextField
          label="Title"
          handleInput={this.onInputChange}
          value={titleInput}
          helperText={INVALID_TEXT_INPUT}
          invalid={showValidations && !titleInputValid}
        />
        <TextField
          label="Price"
          preLabel="$"
          handleInput={this.onInputChange}
          value={priceInput}
          helperText={INVALID_PRICE_INPUT}
          invalid={showValidations && !priceInputValid}
        />
        <TextField
          label="Description"
          multiline
          handleInput={this.onInputChange}
          value={descriptionInput}
          helperText={INVALID_TEXT_INPUT}
          invalid={showValidations && !descriptionInputValid}
        />
        <Input
          type="file"
          required
          error={showValidations && !fileInputValid}
          fullWidth
          onChange={this.localFileUpload}
        />
        <Button onClick={this.postDish} color="secondary" label="Submit" />
      </Container>
    );
  }
}
