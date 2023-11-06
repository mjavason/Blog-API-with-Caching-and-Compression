import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'; // Import Swagger decorators
import { MESSAGES } from 'src/constants';
import { SuccessResponse } from 'src/helpers/response.helper';
import { IBlog } from './blog.interface';
import { ResponseDto } from 'src/dto';
import { IResponseData } from 'src/interfaces/response.interface';
import {
  CreateBlogDto,
  BlogIdDto,
  UpdateBlogDto,
} from './blog.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
@ApiTags('Blog')
@ApiBearerAuth('jwt')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
export class BlogController {
  constructor(private readonly service: BlogService) {}

  // Create a new blog
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new blog' }) // Add an API operation summary
  async create(@Body() body: CreateBlogDto): Promise<IResponseData<IBlog>> {
    console.log(Req);

    const data = await this.service.create(body);

    if (!data) throw new InternalServerErrorException();

    return SuccessResponse(data);
  }

  // Update an existing blog
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing blog' })
  async update(
    @Param() param: BlogIdDto,
    @Body() body: UpdateBlogDto,
  ): Promise<IResponseData<IBlog>> {
    const { id } = param;

    const data = await this.service.update({ _id: id }, body);

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.UPDATED);
  }

  // Soft delete a blog
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a blog' })
  async delete(@Param() param: BlogIdDto): Promise<IResponseData<IBlog>> {
    const { id } = param;

    const data = await this.service.softDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }

  // Hard delete a blog (for admins only)
  @Delete(':id/hard')
  @ApiOperation({ summary: 'Hard delete a blog (for admins only)' })
  async hardDelete(@Param() param: BlogIdDto): Promise<IResponseData<IBlog>> {
    const { id } = param;

    const data = await this.service.hardDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }
}
