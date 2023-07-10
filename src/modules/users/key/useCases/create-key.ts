import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationSettingsRepository } from 'src/infrastructure/repositories/application-settings.repository';
import { KeyRepository } from 'src/infrastructure/repositories/key.repository';
import { KeyErrorTags } from './enums/key-errors-tags';
import { KeyModel } from './models/key.model';
import { ApplicationError } from 'src/common/error/errors/application.error';

interface ICreateKeyServiceArgs {
    masterKey: string;
}

interface ICreateKeyReturn {
    code: string;
}

@Injectable()
export class CreateKey {
    constructor(
        private readonly configService: ConfigService,
        private readonly applicationSettingsRepository: ApplicationSettingsRepository,
        private readonly keyRepository: KeyRepository
    ) { }
    
    async handle({ masterKey }: ICreateKeyServiceArgs): Promise<ICreateKeyReturn> {
        const appSettings = await this.applicationSettingsRepository.find();
        if (appSettings) {
            throw new ApplicationError(KeyErrorTags.MASTERKEY_ALREADY_USED);
        }

        const appMasterKey = this.configService.get('MASTER_KEY');
        if (appMasterKey !== masterKey) {
            throw new ApplicationError(KeyErrorTags.INCORRECT_MASTERKEY);
        }

        const generatedKey = new KeyModel();

        const [key] = await Promise.all([
            this.keyRepository.create(generatedKey),
            this.applicationSettingsRepository.create()
        ]);

        return key;
    }
}
