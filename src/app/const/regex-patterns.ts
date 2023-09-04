export class RegexPatterns {
  public static readonly Password: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
  public static readonly PhoneNumber: RegExp = /^(\+)?(84|0)([35789])([0-9]{8})$/;
}
