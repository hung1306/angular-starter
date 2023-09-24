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

  public static readonly AuthLogin: string[] = ['', NavigationRoutes.Auth, NavigationRoutes.Login];
  public static readonly AuthForgotPassword: string[] = ['', NavigationRoutes.Auth, NavigationRoutes.ForgotPassword];

  // account
  public static readonly Account: string = 'account';

  // users
  public static readonly Users: string = 'users';
}
