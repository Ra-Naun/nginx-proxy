export enum requestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}
export const revalidateAuthToken = process.env.REVALIDATE_AUTH_TOKEN || '';
