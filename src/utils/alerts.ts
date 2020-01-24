import SweetAlert, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';
import { colors } from '../config';

const successfulOptions = (title: string) =>
  ({
    title,
    // timer: 2000,
    icon: 'success',
    confirmButtonColor: colors.action
  } as SweetAlertOptions);

const unsuccessfulOptions = (title: string) =>
  ({
    title,
    timer: 2000,
    icon: 'error'
  } as SweetAlertOptions);

const confirmOptions = {
  title: 'Are you sure?',
  text: "You won't be able to revert this.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  reverseButtons: true
} as SweetAlertOptions;

export const alertSuccessful = (title: string): Promise<SweetAlertResult> =>
  SweetAlert.fire(successfulOptions(title));

export const alertUnsuccessful = (title: string): Promise<SweetAlertResult> =>
  SweetAlert.fire(unsuccessfulOptions(title));

export const showLoading = (): void => SweetAlert.showLoading();

export const alertConfirm = (): Promise<SweetAlertResult> => {
  return SweetAlert.fire(confirmOptions);
};
