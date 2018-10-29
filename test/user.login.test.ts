import userLogin from '../usecases/login';
import IAppLogin from '../interfaces/app-login';
import IStorageUser from '../interfaces/storage-user';
import IUser from '../domain/user';

const status = {
  NOT_FOUND: 'not-found',
  INVALID_PASSWORD: 'invalid-password',
  SUCCESS: 'success',
};

class AppLoginProvider implements IAppLogin {
  public email: string;
  public password: string;
  public status!: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public notFound() {
    this.status = status.NOT_FOUND;
  }
  public invalidPassword() {
    this.status = status.INVALID_PASSWORD;
  }
  public success() {
    this.status = status.SUCCESS;
  }
}

class StorageProvider implements IStorageUser {
  private data: IUser[] = [
    {
      id: 'test',
      email: 'test@test.com',
      password: 'test'
    }
  ];

  public find(email: string): IUser | undefined {
    return this.data.find((item) => item.email === email);
  }
}

describe('login', () => {

  const storageProvider = new StorageProvider();

  test(`should call the 'notFound' method when user hasn't found`, () => {
    const appProvider = new AppLoginProvider('not-found-user@test.com', 'test');
    userLogin(appProvider, storageProvider);
    expect(appProvider.status).toBe(status.NOT_FOUND);
  });

  test(`should call the 'invalidPassword' method when user has found but password is invalid`, () => {
    const appProvider = new AppLoginProvider('test@test.com', 'invalidpass');
    userLogin(appProvider, storageProvider);
    expect(appProvider.status).toBe(status.INVALID_PASSWORD);
  });

  test(`should call the 'success' method when user has found and password is valid`, () => {
    const appProvider = new AppLoginProvider('test@test.com', 'test');
    userLogin(appProvider, storageProvider);
    expect(appProvider.status).toBe(status.SUCCESS);
  });
});
