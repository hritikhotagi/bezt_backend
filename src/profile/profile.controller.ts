import { Controller, Get, Post, Patch, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('api/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Create a new profile
  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(createProfileDto);
  }

  // Fetch a profile by userId
  @Get(':userId')
  getProfileByUserId(@Param('userId') userId: string) {
    const id = Number(userId);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.profileService.getProfileByUserId(id);
  }

  // Fetch all profiles
  @Get()
  getAllProfiles() {
    return this.profileService.getAllProfiles();
  }

  // Fetch a profile by profile ID
  @Get('profile/:profileId')
  getProfileById(@Param('profileId') profileId: string) {
    const id = Number(profileId);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid profile ID');
    }

    return this.profileService.getProfileById(id);
  }

  // Update a profile by userId
  @Patch(':userId')
  updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    const id = Number(userId);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.profileService.updateProfile(id, updateProfileDto);
  }

  // Delete a profile by userId
  @Delete(':userId')
  deleteProfile(@Param('userId') userId: string) {
    const id = Number(userId);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.profileService.deleteProfile(id);
  }
}
