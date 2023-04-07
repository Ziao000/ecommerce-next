import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @MinLength(3, {
    message: 'Le prénom doit contenir au moins 3 caractères',
  })
  firstName?: string;

  @IsOptional()
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide' })
  email?: string;

  @IsOptional()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  password?: string;

  @IsOptional()
  @MinLength(10, {
    message: 'L\'adresse doit contenir au moins 10 caractères',
  })
  address?: string;

  @IsOptional()
  @MinLength(3, {
    message: 'Le pays doit contenir au moins 3 caractères',
  })
  country?: string;
}
