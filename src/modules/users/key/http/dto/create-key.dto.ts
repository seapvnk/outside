
import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyDto {
  @ApiProperty()
  masterKey: string;
}

export class CreateKeyResponseDto {
  code: string;
}
