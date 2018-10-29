import IAppLogin from '../interfaces/app-login';
import IStorageUser from '../interfaces/storage-user';

export default (appProvider: IAppLogin, storageProvider: IStorageUser): void => {
  const user = storageProvider.find(appProvider.email);
  if (!user) {
    appProvider.notFound();
    return;
  }

  if (user.password !== appProvider.password) {
    appProvider.invalidPassword();
    return;
  }

  appProvider.success(user);
};
