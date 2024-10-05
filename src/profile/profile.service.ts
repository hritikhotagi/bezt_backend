import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // Create a new profile
  async createProfile(data: CreateProfileDto) {
    return this.prisma.profile.create({
        data: {
            ...data,
            userId: Number(data.userId),
          },
    });
  }

  // Get all profiles
  async getAllProfiles() {
    return this.prisma.profile.findMany();
  }

  // Get a profile by profile ID
  async getProfileById(profileId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },  // Fetch profile by its own ID (not userId)
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // Get a profile by userId
  async getProfileByUserId(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: true,
      }, 
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // Update an existing profile by userId
  async updateProfile(userId: number, data: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.prisma.profile.update({
      where: { userId },
      data,
    });
  }

  // Delete a profile by userId
  async deleteProfile(userId: number) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.prisma.profile.delete({
      where: { userId },
    });
  }
}
