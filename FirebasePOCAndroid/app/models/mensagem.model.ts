export class Mensagem {
  public static get FIREBASE_PATH(): string { return "/mensagens"; };

  constructor
    (
    public id: string,
    public mensagem: string
    )
  { }
}