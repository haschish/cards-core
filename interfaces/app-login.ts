import IUser from '../domain/user';

interface IAppLogin {
  email: string;
  password: string;
  notFound: () => void;
  invalidPassword: () => void;
  success: (user: IUser) => void;
}

export default IAppLogin;
