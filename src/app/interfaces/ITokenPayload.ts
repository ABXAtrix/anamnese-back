export default interface ITokenPayload {
  sub: string;
  email: string;
  name: string;
  iss?: string;  // Issuer (emissor do token)
  aud?: string;  // Audience (destinatário do token)
}
