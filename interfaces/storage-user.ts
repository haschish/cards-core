import IUser from '../domain/user';

interface IStorageUser {
  find: (email: string) => IUser | undefined;
}

export default IStorageUser;
