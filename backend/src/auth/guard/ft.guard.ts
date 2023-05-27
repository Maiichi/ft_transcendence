import { Injectable } from "@nestjs/common";
import { AuthGuard } from "passport-42";

@Injectable()
export class FortyTwoGuard extends AuthGuard('42') {}