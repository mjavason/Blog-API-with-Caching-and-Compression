import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IsObjectIdOrHexString } from 'src/decorators/is_object_id.decorator';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObjectIdOrHexString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  min_read: number;

  @ApiProperty({ required: false })
  @IsOptional()
  is_published: boolean;
}

export class UpdateBlogDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObjectIdOrHexString()
  author: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  min_read: number;

  @ApiProperty({ required: false })
  @IsOptional()
  is_published: boolean;
}

export class FindBlogDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObjectIdOrHexString()
  _id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;
}

export class GetAllBlogsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pagination: number;
}

export class BlogIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObjectIdOrHexString()
  id: string;
}
