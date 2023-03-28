import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenModel } from './models/token.model';
import { BlackListTokenModel } from './models/black-list-token.model';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TokenModel.name)
    private readonly tokenModel: Model<TokenModel>,
    @InjectModel(BlackListTokenModel.name)
    private readonly blackListTokenModel: Model<BlackListTokenModel>
  ) {}

  public async findToken(userId: string) {
    return this.tokenModel.findOne({ userId });
  }

  public async findRevokedToken(refreshToken: string) {
    return this.blackListTokenModel.findOne({ refreshToken });
  }

  public async saveRevokedToken(refreshToken: string): Promise<void> {
    if (await this.findRevokedToken(refreshToken)) {
      return;
    }
    this.blackListTokenModel.create({ refreshToken });
  }

  public async saveToken(userId: string, refreshToken: string): Promise<void> {
    this.tokenModel.create({ userId, refreshToken });
  }

  public async destroyToken(refreshToken: string): Promise<void> {
    this.tokenModel.deleteOne({ refreshToken }).exec();
  }
}
