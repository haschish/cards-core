import IUser from '../domain/user';

interface IStorageUser {
  find: (email: string) => Promise<IUser | undefined>;
}

export default IStorageUser;
