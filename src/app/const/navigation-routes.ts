export class NavigationRoutes {
  // common
  public static readonly Create: string = 'create';
  public static readonly Id: string = ':id';
  public static readonly Empty: string = '';
  public static readonly Other: string = '**';
  public static readonly Parent: string = '**';

  // auth
  public static readonly Auth: string = 'auth';
  public static readonly Login: string = 'login';
  public static readonly ForgotPassword: string = 'forgot-password';
  public static readonly ResetPassword: string = 'reset-password';
<<<<<<< HEAD
=======

  public static readonly AuthLogin: string[] = ['', NavigationRoutes.Auth, NavigationRoutes.Login];
  public static readonly AuthForgotPassword: string[] = ['', NavigationRoutes.Auth, NavigationRoutes.ForgotPassword];

>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
  // account
  public static readonly Account: string = 'account';

  // users
  public static readonly Users: string = 'users';
}
