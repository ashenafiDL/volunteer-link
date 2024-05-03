import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':projectId')
  addReviewToProject(
    @Req() req,
    @Param('projectId') projectId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const userId = req.user.sub;
    return this.reviewsService.addReviewToProject(
      createReviewDto,
      userId,
      projectId,
    );
  }

  @Public()
  @Get(':projectId')
  getAllReviewByProjectId(@Param('projectId') projectId: string) {
    return this.reviewsService.getReviewsByProjectId(projectId);
  }

  @Get('check/:projectId')
  checkReviewed(@Param('projectId') projectId: string, @Req() req) {
    const userId = req.user.sub;
    return this.reviewsService.checkReviewed(userId, projectId);
  }
}
