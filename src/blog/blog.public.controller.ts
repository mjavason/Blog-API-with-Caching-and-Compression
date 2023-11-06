import {
  Controller,
  Get,
  Param,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'; // Import Swagger decorators
import { MESSAGES } from 'src/constants';
import { SuccessResponse } from 'src/helpers/response.helper';
import { IBlog } from './blog.interface';
import { ResponseDto } from 'src/dto';
import { IResponseData } from 'src/interfaces/response.interface';
import { FindBlogDto, GetAllBlogsDto } from './blog.dto';

@Controller('blog')
@ApiTags('Blog')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class BlogControllerPublic {
  constructor(private readonly service: BlogService) {}

  // Get a list of all blogs with optional pagination
  @Get()
  @ApiOperation({ summary: 'Get a list of all blogs with optional pagination' })
  async getAllDefault(): Promise<IResponseData<IBlog[]>> {
    const data = await this.service.getAll(0);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }

  // Find blogs based on search criteria
  @Get('search')
  @ApiOperation({ summary: 'Find blogs based on search criteria' })
  async find(@Query() query: FindBlogDto): Promise<IResponseData<IBlog[]>> {
    const data = await this.service.find(query);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }

  // Check if blogs exist based on search criteria
  @Get('exists')
  @ApiOperation({ summary: 'Check if blogs exist based on search criteria' })
  async exists(@Query() query: FindBlogDto): Promise<IResponseData<[]>> {
    const data = await this.service.exists(query);

    // If nothing exists, return 'false'
    if (!data) return SuccessResponse(false);

    return SuccessResponse(data);
  }

  // Get the count of blogs based on search criteria
  @Get('count')
  @ApiOperation({ summary: 'Get the count of blogs based on search criteria' })
  async getCount(@Query() query: FindBlogDto): Promise<IResponseData<IBlog>> {
    const data = await this.service.getCount(query);

    // If nothing exists, return 0 as the count
    if (!data) return SuccessResponse(0);

    return SuccessResponse(data);
  }

  // Get a list of all blogs with optional pagination
  @Get(':pagination')
  @ApiOperation({ summary: 'Get a list of all blogs with optional pagination' }) // Define the URL parameter
  async getAll(@Param() param: GetAllBlogsDto): Promise<IResponseData<IBlog>> {
    let { pagination } = param;
    if (!pagination) pagination = 1;

    pagination = (pagination - 1) * 10;

    const data = await this.service.getAll(pagination);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }
}
