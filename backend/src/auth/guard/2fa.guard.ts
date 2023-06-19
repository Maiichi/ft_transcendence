import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class TwoFactorAuthentication extends AuthGuard('jwt-2fa') {}