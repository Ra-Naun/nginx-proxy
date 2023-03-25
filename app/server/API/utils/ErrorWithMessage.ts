// если порождаем эту ошибку, то юзеру отправится сообщение из него, иначе юзеру отправится сообщение 'Something went wrong'
export class ErrorWithMessage extends Error {
  constructor(message: string) {
    super(message);
  }
}
