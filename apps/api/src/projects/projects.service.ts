// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from "./../prisma.service";

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findByApiKey(apiKey: string) {
    return await this.prisma.project.findUnique({
      where: { apiKey },
    });
  }

  // Puedes agregar más métodos relacionados con proyectos aquí
  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.project.findUnique({
      where: { id },
    });
  }
}