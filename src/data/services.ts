import type { MediaAsset } from "./homepageContent";

export type ServiceOffering = {
  title: string;
  description: string;
  image?: MediaAsset;
};

export type Service = {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  discipline: string;
  eyebrow: string;
  heroHeadline: string;
  heroLines: string[];
  heroDescription: string;
  heroImage: MediaAsset;
  heroPosition: string;
  overview: {
    headline: string;
    description: string;
    label: string;
    capabilities: string[];
  };
  introduction: {
    headline: string[];
    description: string;
    approach: string;
    image: MediaAsset;
  };
  offerings: ServiceOffering[];
  process: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  benefitsHeadline: string[];
  faqs: { question: string; answer: string }[];
  cta: { headline: string[]; description: string; label: string };
  seo: { title: string; description: string };
  inquiryNote?: string;
};

function photo(
  id: number,
  alt: string,
  credit: string,
  label: string,
): MediaAsset {
  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`,
    alt,
    credit: `Pexels / ${credit}`,
    fallbackLabel: label,
    aspect: "16 / 10",
  };
}

const media = {
  studio: photo(
    9218551,
    "Sunlit creative workspace with a laptop and sculptural objects beside a large window",
    "PNW Production",
    "Creative studio",
  ),
  web: photo(
    7172661,
    "Dark design studio with widescreen computer monitors and a carefully arranged desk",
    "Matheus Bertelli",
    "Web design studio",
  ),
  laptop: photo(
    12882908,
    "A minimal laptop balanced on natural stone in a considered studio composition",
    "Leonid Altman",
    "Digital experiences",
  ),
  design: photo(
    6446678,
    "Open laptop and ceramic vessels on a timber worktable in a bright design studio",
    "gravity cut",
    "Thoughtful website design",
  ),
  responsive: photo(
    9393252,
    "Desktop computer and smartphone together on a clean wooden workspace",
    "Mustafa Akkus",
    "Responsive experiences",
  ),
  social: photo(
    15977090,
    "Camera, lenses, digital tablet, and laptop arranged for content production",
    "Kawe Rodrigues",
    "Content creation studio",
  ),
  production: photo(
    33714923,
    "Creative team working with professional lighting during a studio photography session",
    "Matheus Bertelli",
    "Creative content production",
  ),
  camera: photo(
    265144,
    "Black and white workspace with a laptop, camera, lens, and a cup of coffee",
    "Pixabay",
    "Social content planning",
  ),
  billing: photo(
    10376254,
    "Overhead view of an administrative specialist reviewing documents beside a laptop and tablet",
    "RDNE Stock project",
    "Healthcare administrative support",
  ),
  documents: photo(
    8296953,
    "Organized administrative desktop with laptop, calculator, and paper records",
    "Mikhail Nilov",
    "Organized billing workflows",
  ),
  review: photo(
    5717709,
    "Administrative professional carefully reviewing financial documents at a laptop",
    "Kaboompics",
    "Documentation and review",
  ),
};

export const SERVICES: Record<string, Service> = {
  "web-design-development": {
    id: "service-01",
    number: "01",
    slug: "web-design-development",
    title: "Web Design & Development",
    shortTitle: "Web Design & Development",
    discipline: "DIGITAL EXPERIENCES",
    eyebrow: "WEB DESIGN & DEVELOPMENT",
    heroHeadline: "Web experiences that work beautifully.",
    heroLines: ["Web experiences", "that work", "beautifully."],
    heroDescription:
      "We design and develop modern websites that bring together thoughtful visuals, intuitive user experiences, and dependable functionality.",
    heroImage: media.web,
    heroPosition: "60% center",
    overview: {
      headline: "Digital experiences built with purpose.",
      description:
        "Thoughtfully designed and developed websites that combine clear user experiences, responsive layouts, and modern functionality.",
      label: "Explore Web Services",
      capabilities: [
        "Website Design",
        "Website Development",
        "Responsive Web Experiences",
        "UI/UX Design",
      ],
    },
    introduction: {
      headline: ["More than a website.", "A considered experience."],
      description:
        "Your website is where people get to know your business. We bring structure, design, and development together to make that experience clear, useful, and unmistakably yours.",
      approach:
        "We start with your audience, content, and business goals, then shape a digital experience around them. From the first navigation sketch to the final responsive build, every decision has a purpose.",
      image: media.laptop,
    },
    offerings: [
      {
        title: "Website Design",
        description:
          "Custom website design built around your brand identity, content, and business goals. We develop layouts, typography, and visual direction that help visitors understand your business and find their next step.",
        image: media.design,
      },
      {
        title: "Website Development",
        description:
          "Development of modern, functional websites with maintainable code and responsive layouts. We translate the agreed design into a working experience with considered navigation and the functionality your project requires.",
        image: media.web,
      },
      {
        title: "Responsive Web Experiences",
        description:
          "Websites designed to deliver a consistent experience across desktop, tablet, and mobile devices. Content, imagery, and interactions adapt to the screen rather than simply shrinking a desktop layout.",
        image: media.responsive,
      },
      {
        title: "UI/UX Design",
        description:
          "Thoughtful interfaces, intuitive navigation, and clear content structures that make websites easier to use. We consider user journeys and important actions so the experience stays focused and understandable.",
        image: media.laptop,
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "Understand your audience, brand, existing content, and what the website needs to achieve.",
      },
      {
        title: "Structure & Design",
        description:
          "Map the content, define user journeys, and establish the visual direction together.",
      },
      {
        title: "Develop",
        description:
          "Build responsive layouts and the agreed functionality with a maintainable foundation.",
      },
      {
        title: "Test & Refine",
        description:
          "Review across screen sizes, test key interactions, and refine the details before handover.",
      },
    ],
    benefitsHeadline: ["Thoughtful design.", "Everyday usefulness."],
    benefits: [
      {
        title: "A clearer first impression",
        description:
          "A coherent visual identity and content hierarchy help people understand who you are and what you offer.",
      },
      {
        title: "Easier to find the next step",
        description:
          "Considered navigation and clear calls to action make exploring your services and getting in touch more straightforward.",
      },
      {
        title: "Built for real-world use",
        description:
          "Responsive layouts and maintainable development give your website a practical foundation as your needs change.",
      },
    ],
    faqs: [
      {
        question: "What types of websites can SolvingOdds build?",
        answer:
          "We design and develop business websites, service-led websites, and e-commerce experiences. We discuss your content, functionality, and audience before defining the right scope.",
      },
      {
        question: "Can you redesign an existing website?",
        answer:
          "Yes. We can review an existing website and plan a redesign around your current goals, content, brand, and functionality. What can be retained depends on the existing setup.",
      },
      {
        question: "Will my website work on mobile devices?",
        answer:
          "Yes. Responsive layouts are part of our web design and development approach, with content and interactions considered across desktop, tablet, and mobile screens.",
      },
      {
        question: "Can you help with both design and development?",
        answer:
          "Yes. We offer both website design and website development, alongside UI/UX design and responsive web experiences. These can be coordinated as one engagement.",
      },
      {
        question: "How do we start a website project?",
        answer:
          "Start with a conversation about your business, audience, existing website if you have one, and what you want to create. We then define the requirements and practical next steps together.",
      },
    ],
    cta: {
      headline: ["Have a website in mind?", "Let's build it."],
      description:
        "Tell us what your website needs to do. We will help you find a clear direction for the design, development, and experience.",
      label: "Discuss Your Website",
    },
    seo: {
      title: "Web Design & Development | SolvingOdds",
      description:
        "Custom website design, modern web development, responsive web experiences, and UI/UX design built around your business by SolvingOdds.",
    },
  },
  "social-media-services": {
    id: "service-02",
    number: "02",
    slug: "social-media-services",
    title: "Social Media Services",
    shortTitle: "Social Media Services",
    discipline: "BRAND COMMUNICATION",
    eyebrow: "SOCIAL MEDIA SERVICES",
    heroHeadline: "Make your brand part of the conversation.",
    heroLines: ["Make your brand", "part of the", "conversation."],
    heroDescription:
      "We help businesses create, manage, and maintain a consistent social media presence through thoughtful content, creative design, and structured account management.",
    heroImage: media.social,
    heroPosition: "65% center",
    overview: {
      headline: "A stronger presence starts with a clear strategy.",
      description:
        "Social media management, creative content, and visual communication that help businesses maintain a consistent and engaging presence.",
      label: "Explore Social Media Services",
      capabilities: [
        "Social Media Management",
        "Social Content Creation",
        "Graphic Design",
        "Social Media Strategy",
      ],
    },
    introduction: {
      headline: ["A clear voice.", "A consistent presence."],
      description:
        "Showing up online should feel like an extension of your business. We connect content planning, creative execution, and account management to give your social presence a considered direction.",
      approach:
        "We get to know your brand and audience before creating content themes and a practical workflow. Ideas, visuals, reviews, and publishing are organized around a shared understanding of your goals.",
      image: media.production,
    },
    offerings: [
      {
        title: "Social Media Management",
        description:
          "Support with organizing, managing, and maintaining business social media accounts. We establish a practical posting and review workflow so your communication stays coordinated and consistent.",
        image: media.camera,
      },
      {
        title: "Content Creation",
        description:
          "Social media content designed to communicate your message and support a consistent brand presence. We shape content ideas, copy, and visual direction around your audience and agreed content themes.",
        image: media.production,
      },
      {
        title: "Graphic Design",
        description:
          "Branded graphics and visual content created for social media platforms. Layouts, typography, and imagery work together to make posts recognizable and appropriate for each format.",
        image: media.social,
      },
      {
        title: "Social Media Strategy",
        description:
          "Planning content themes, communication direction, and posting approaches around business objectives. A clear plan helps connect everyday content decisions to the bigger picture.",
        image: media.camera,
      },
    ],
    process: [
      {
        title: "Understand the Brand",
        description:
          "Get to know your business, voice, audience, existing accounts, and communication goals.",
      },
      {
        title: "Plan Content",
        description:
          "Define content themes, creative direction, and a posting approach that fits your needs.",
      },
      {
        title: "Create & Review",
        description:
          "Develop copy and visuals, then review the content together before publication.",
      },
      {
        title: "Publish & Refine",
        description:
          "Coordinate agreed publishing, review the work, and refine the direction as needs evolve.",
      },
    ],
    benefitsHeadline: ["Less disconnected.", "More unmistakably you."],
    benefits: [
      {
        title: "One recognizable brand voice",
        description:
          "Consistent visual direction and communication help your social presence feel connected to the business behind it.",
      },
      {
        title: "Purpose behind every post",
        description:
          "Defined content themes make it easier to communicate useful messages instead of creating isolated posts without direction.",
      },
      {
        title: "A more organized workflow",
        description:
          "A structured approach to planning, reviews, and publishing gives everyone a clearer understanding of what happens next.",
      },
    ],
    faqs: [
      {
        question: "What social media services do you provide?",
        answer:
          "Our services include social media management, content creation, graphic design, and social media strategy. We can combine these around the needs of your business.",
      },
      {
        question: "Can you create content for my existing accounts?",
        answer:
          "Yes. We can work with your existing business accounts and brand assets. We first review your current content and agree on a direction, formats, and review process.",
      },
      {
        question: "Can you manage ongoing social media posting?",
        answer:
          "Yes. Social media management can include organizing and maintaining ongoing posting. Platforms, responsibilities, and the publishing approach are agreed as part of the scope.",
      },
      {
        question: "Do you provide branded graphics?",
        answer:
          "Yes. We design social media graphics and visual content around your brand identity, message, and the formats required for the agreed platforms.",
      },
      {
        question: "How does the social media process begin?",
        answer:
          "We start by understanding your business, brand voice, audience, and current accounts. From there, we define content priorities and a practical plan for creating, reviewing, and publishing.",
      },
    ],
    cta: {
      headline: ["Let's create a stronger", "social presence."],
      description:
        "Bring us your brand, your ideas, and what you want to say. Let's give your social media a thoughtful, consistent direction.",
      label: "Discuss Your Social Presence",
    },
    seo: {
      title: "Social Media Services | SolvingOdds",
      description:
        "Social media management, content creation, branded graphic design, and social media strategy for a consistent business presence with SolvingOdds.",
    },
  },
  "medical-billing": {
    id: "service-03",
    number: "03",
    slug: "medical-billing",
    title: "Medical Billing Services",
    shortTitle: "Medical Billing Services",
    discipline: "REVENUE CYCLE SUPPORT",
    eyebrow: "MEDICAL BILLING & REVENUE CYCLE SUPPORT",
    heroHeadline: "Simplifying the business side of healthcare.",
    heroLines: ["Simplifying the", "business side", "of healthcare."],
    heroDescription:
      "SolvingOdds provides medical billing support, provider credentialing and enrollment, claim production, and accounts receivable follow-up for healthcare practices.",
    heroImage: media.billing,
    heroPosition: "65% center",
    overview: {
      headline: "Focused support for the business side of healthcare.",
      description:
        "Medical billing and revenue cycle support covering provider enrollment, claims, and accounts receivable processes.",
      label: "Explore Medical Billing Services",
      capabilities: [
        "Provider Credentialing & Enrollment",
        "Medical Billing",
        "Claim Creation & Production",
        "Accounts Receivable Follow-Up",
      ],
    },
    introduction: {
      headline: ["Behind the practice.", "Alongside your team."],
      description:
        "The administrative side of healthcare involves connected processes, detailed information, and ongoing follow-up. We provide focused support across those workflows so responsibilities and next steps stay clear.",
      approach:
        "We begin by understanding your practice's existing processes and the areas where support is needed. We then agree on the scope, working arrangements, and review points for credentialing, enrollment, billing, claims, or accounts receivable.",
      image: media.documents,
    },
    offerings: [
      {
        title: "Medical Billing",
        description:
          "We handle medical billing processes, including claim preparation, submission, and payment tracking. Our support helps healthcare practices maintain organized billing workflows and follow up on outstanding reimbursements.",
        image: media.billing,
      },
      {
        title: "Medical Billing Audit",
        description:
          "We review billing procedures, submitted claims, and payment records to identify potential errors and discrepancies. Our auditing support helps practices recognize improvement opportunities and maintain more accurate billing processes.",
        image: media.review,
      },
      {
        title: "Prior Authorization",
        description:
          "We assist with insurance prior authorization requests, required documentation, and payer follow-ups. Our team helps practices coordinate authorization processes and track pending requests.",
        image: media.documents,
      },
      {
        title: "Revenue Cycle Management (RCM)",
        description:
          "We provide revenue cycle support covering patient eligibility verification, claims processing, payment tracking, and follow-up. Our services help healthcare practices coordinate administrative billing activities throughout the revenue cycle.",
        image: media.billing,
      },
      {
        title: "Accounts Receivable (A/R) Follow-Up",
        description:
          "We monitor outstanding claims and unpaid insurance balances to identify items requiring attention. Our team follows up with payers and tracks unresolved payments to support organized accounts receivable management.",
        image: media.review,
      },
      {
        title: "Virtual Assistant Services",
        description:
          "We provide remote administrative assistance for healthcare practices, including appointment coordination, routine communications, and documentation support. Our virtual assistants help manage daily administrative responsibilities within agreed workflows.",
        image: media.billing,
      },
      {
        title: "Insurance Verification",
        description:
          "We assist with verifying patient insurance eligibility, coverage details, and benefit information. Our support helps practices identify coverage-related questions before services are provided.",
        image: media.documents,
      },
      {
        title: "Credentialing & Contracting",
        description:
          "We assist healthcare providers with credentialing, insurance enrollment, payer contracting documentation, and application follow-ups. Our support helps practices manage administrative requirements for participating in insurance networks.",
        image: media.review,
      },
      {
        title: "Denial Management",
        description:
          "We review denied claims, identify reported denial reasons, and assist with corrections, resubmissions, and appropriate appeals. Our support helps practices track denials and manage unresolved claims.",
        image: media.documents,
      },
      {
        title: "Front Desk Support",
        description:
          "We provide remote front-desk assistance with appointment scheduling, patient registration coordination, and routine administrative communication. Our support helps healthcare practices organize daily front-office activities.",
        image: media.billing,
      },
    ],
    process: [
      {
        title: "Initial Review",
        description:
          "Understand your practice's current workflows, administrative requirements, and areas needing support.",
      },
      {
        title: "Workflow Planning",
        description:
          "Agree on scope, responsibilities, communication, and the information needed for the work.",
      },
      {
        title: "Billing Operations",
        description:
          "Carry out agreed credentialing, enrollment, billing, or claim production activities.",
      },
      {
        title: "Follow-Up & Review",
        description:
          "Review outstanding items, coordinate follow-up, and keep your practice informed of next steps.",
      },
    ],
    benefitsHeadline: ["More organized processes.", "Clearer next steps."],
    benefits: [
      {
        title: "Connected administrative support",
        description:
          "Credentialing, enrollment, billing, and follow-up can be coordinated around a clear understanding of your practice's needs.",
      },
      {
        title: "Visibility into outstanding items",
        description:
          "Structured review and follow-up help keep unresolved claims and balances part of an active administrative workflow.",
      },
      {
        title: "Defined responsibilities",
        description:
          "An agreed scope and straightforward communication help your team understand what is being supported and where input is needed.",
      },
    ],
    faqs: [
      {
        question: "What medical billing services does SolvingOdds provide?",
        answer:
          "We provide provider credentialing and enrollment support, medical billing services, claim creation and production, and accounts receivable (A/R) follow-up for healthcare practices.",
      },
      {
        question:
          "Do you assist with government and commercial insurance enrollment?",
        answer:
          "Yes. Our provider credentialing and enrollment support includes processes involving government and commercial insurance payers. Specific requirements and responsibilities are discussed before work begins.",
      },
      {
        question: "Can you support claim creation and production?",
        answer:
          "Yes. We support the preparation and production of medical claims using the information required for the applicable billing process and the workflows agreed with your practice.",
      },
      {
        question: "Do you provide accounts receivable follow-up?",
        answer:
          "Yes. We provide review and follow-up support for outstanding claims and unpaid balances within the agreed scope. Reimbursement decisions remain with the relevant payer; outcomes are not guaranteed.",
      },
      {
        question: "How can a healthcare practice request a consultation?",
        answer:
          "Visit our Contact page and select Medical Billing Services to share general information about your practice and the support you need. Please do not include patient information, medical records, or sensitive medical details in your message.",
      },
    ],
    cta: {
      headline: ["Let's talk about", "your billing needs."],
      description:
        "Tell us about your practice and the administrative support you are looking for. We can start with a general conversation about your workflows and priorities.",
      label: "Discuss Your Billing Needs",
    },
    seo: {
      title: "Medical Billing & Revenue Cycle Support | SolvingOdds",
      description:
        "Medical billing support, provider credentialing and insurance enrollment, claim creation and production, and accounts receivable follow-up for healthcare practices.",
    },
    inquiryNote:
      "For practice inquiries only. Please do not share patient information, medical records, or claim details through this website.",
  },
};

export const SERVICE_LIST = Object.values(SERVICES);
export const servicePath = (slug: string) => `/services/${slug}`;
export const serviceForHomeId = (id: string) =>
  SERVICE_LIST.find((service) => service.id === id);

export const SERVICES_OVERVIEW = {
  eyebrow: "OUR EXPERTISE",
  heroHeadline: "Different challenges. One place for solutions.",
  heroLines: ["Different challenges.", "One place for", "solutions."],
  description:
    "From designing digital experiences and managing social media to supporting healthcare revenue operations, SolvingOdds brings together specialized services designed around your business needs.",
  image: media.studio,
  introduction:
    "A website that feels right. A social presence with direction. An administrative workflow that is easier to follow. Our three service areas respond to different challenges with the same clear, considered approach.",
  process: [
    {
      title: "Discover",
      description:
        "Understand your business, current challenges, and what you want to achieve.",
    },
    {
      title: "Plan",
      description:
        "Define a focused direction, the scope of support, and practical next steps.",
    },
    {
      title: "Execute",
      description:
        "Bring the plan to life through thoughtful creative, digital, or operational work.",
    },
    {
      title: "Refine",
      description:
        "Review the work together, make improvements, and support what comes next.",
    },
  ],
  cta: {
    headline: ["Let's work on", "what's next."],
    description:
      "Tell us about your goals, and let's explore how SolvingOdds can support your business.",
    label: "Start a Conversation",
  },
  seo: {
    title: "Our Services | Web, Social Media & Medical Billing | SolvingOdds",
    description:
      "Explore SolvingOdds services: web design and development, social media management and content, and medical billing and revenue cycle support.",
  },
};
