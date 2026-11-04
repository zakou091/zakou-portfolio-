import { Component, HostListener } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

type ProjectApplication = {
  name: string;
  description: string;
  stack?: string[];
};

type ProjectType = 'professional' | 'personal' | 'research';

type Project = {
  number: string;
  category: string;
  title: string;
  type: ProjectType;
  role?: string;
  description: string;
  technologies: string[];
  status: string;
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  linkLabel?: string;
  embed?: string;
  screenshots?: string[];
  applicationList?: ProjectApplication[];
  visual: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;
  year = new Date().getFullYear();
  openEmbeds: Record<string, boolean> = {};
  activeSlide: Record<string, number> = {};

  readonly projects: Project[] = [
    {
      number: '01',
      category: 'SPEECH AI · LOW-RESOURCE NLP',
      title: 'Zarma Voice AI',
      type: 'research',
      role: 'Data preparation, model fine-tuning and audio evaluation',
      description: 'Research and development focused on adapting a neural text-to-speech model to Zarma, a low-resource language. The work includes corpus preparation, model fine-tuning and qualitative audio evaluation.',
      technologies: ['Python', 'Hugging Face', 'PyTorch', 'LoRA'],
      status: 'Research project',
      featured: true,
      embed: 'https://REMPLACEZ-MOI-VOTRE-URL-DE-DEMO',
      visual: 'speech'
    },
    {
      number: '02',
      category: 'MACHINE TRANSLATION · NLP',
      title: 'Zarma Machine Translation',
      type: 'research',
      role: 'Model fine-tuning, test-set design and human review',
      description: 'Fine-tuning a translation model for English–Zarma and exploring data quality, test-set design and human review to improve translation usefulness.',
      technologies: ['Python', 'Transformers', 'Datasets', 'NLP'],
      status: 'Model development',
      demoUrl: 'https://birma.pythonanywhere.com/',
      linkLabel: 'Try the demo app',
      visual: 'translation'
    },
    {
      number: '03',
      category: 'SOFTWARE ENGINEERING',
      title: 'Business Applications',
      type: 'professional',
      role: 'Full-stack design and development of the applications listed below',
      description: 'Full-stack application development, including business workflows, REST APIs, authentication, roles and permissions, and data-driven interfaces.',
      technologies: ['C#', '.NET', 'Angular', 'Flutter', 'SQL'],
      status: 'Professional experience',
      applicationList: [
        { name: 'MoveNow', description: 'Mobile application for booking and managing gym hall reservations, backed by a REST API that handles the core business operations.', stack: ['Flutter', 'C#', 'ASP.NET Core'] },
        { name: 'EasyFu', description: 'Business application for publishing houses for rent and land for sale, with tracking of each listing from publication to follow-up.' },
        { name: 'Work Tracker', description: 'Web application that centralizes the tracking of professional activities and makes work information easier to manage and consult.', stack: ['Angular', 'TypeScript', 'AG Grid Enterprise'] },
        { name: 'Zarma Language Learning', description: 'Concept for a mobile application making it easier to learn Zarma through vocabulary exercises, translations and audio-based learning materials.', stack: ['Flutter', '.NET API', 'Generative AI', 'TTS'] }
      ],
      screenshots: [],
      visual: 'software'
    },
    {
      number: '04',
      category: 'AI AUTOMATION',
      title: 'AI Content Workflow',
      type: 'personal',
      role: 'Workflow design, integration and prototyping',
      description: 'An automation workflow exploring AI-assisted content generation with a human approval step before publication. The project uses n8n and an LLM service.',
      technologies: ['n8n', 'LLMs', 'REST APIs', 'Human review'],
      status: 'Prototype / workflow',
      visual: 'automation'
    }
  ];

  readonly skillGroups = [
    {
      title: 'Software Engineering',
      description: 'Building maintainable applications and backend services.',
      skills: ['C#', '.NET / ASP.NET Core', 'REST APIs', 'Entity Framework', 'Authentication & authorization']
    },
    {
      title: 'Frontend Development',
      description: 'Creating responsive, user-focused interfaces.',
      skills: ['Angular', 'TypeScript', 'HTML & CSS', 'Angular Material', 'JavaScript']
    },
    {
      title: 'AI Engineering & NLP',
      description: 'Adapting models and building language-focused AI prototypes.',
      skills: ['Hugging Face', 'Transformers', 'Fine-tuning with LoRA', 'Text-to-Speech', 'Machine Translation']
    },
    {
      title: 'Data & Automation',
      description: 'Connecting systems, data and repeatable workflows.',
      skills: ['Oracle SQL / PL/SQL', 'SQL Server', 'PostgreSQL', 'Git', 'n8n']
    }
  ];

  readonly experience: Experience[] = [
    {
      company: 'Gabera Software Solution',
      role: 'Software Engineer',
      period: 'Dates to confirm',
      location: 'Niamey, Niger',
      summary: 'Full-stack development of business applications, mobile backends and data-driven interfaces for professional clients.',
      highlights: [
        'Design and development of business applications for listings, sales and activity tracking (.NET, Angular, SQL).',
        'REST APIs and mobile backends: gym hall reservations with MoveNow, rental and land listings with EasyFu.',
        'Web application centralizing professional activity tracking with AG Grid Enterprise (Work Tracker).'
      ]
    }
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleEmbed(key: string): void {
    this.openEmbeds[key] = !this.openEmbeds[key];
  }

  slideIndex(key: string): number {
    return this.activeSlide[key] ?? 0;
  }

  prevSlide(key: string, count: number): void {
    this.activeSlide[key] = (this.slideIndex(key) - 1 + count) % count;
  }

  nextSlide(key: string, count: number): void {
    this.activeSlide[key] = (this.slideIndex(key) + 1) % count;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
