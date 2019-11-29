import SweetAlert, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';
import { colors } from '../config';

const successfulOptions = {
  title: 'Successful',
  timer: 2000,
  icon: 'success',
  confirmButtonColor: colors.action
} as SweetAlertOptions;

const unsuccessfulOptions = {
  title: 'Unsuccesful',
  timer: 2000,
  icon: 'error'
} as SweetAlertOptions;

export const alertSuccessful = (): Promise<SweetAlertResult> =>
  SweetAlert.fire(successfulOptions);

export const alertUnsuccessful = (): Promise<SweetAlertResult> =>
  SweetAlert.fire(unsuccessfulOptions);

export const showLoading = (): void => SweetAlert.showLoading();
