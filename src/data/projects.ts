export type ProjectID = "smart-style" | "quantvision-ai" | "portfolio";

export interface ProjectData {
  id: ProjectID;
  title: string;
  tagline: string;
  overview: string;
  problemStatement: string;
  solution: string;
  features: string[];
  systemArchitecture: string;
  architectureDiagramDesc: string; // Simulated diagram description for Apple-style layout
  aiPipeline: string;
  deployment: string;
  technologies: string[];
  challenges: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
  screenshots: string[];
  heroImage: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export const projectsData: Record<ProjectID, ProjectData> = {
  "smart-style": {
    id: "smart-style",
    title: "Smart Style",
    tagline: "AI Fashion Recommendation Platform",
    overview: "Smart Style represents a paradigm shift in how consumers interact with digital fashion. By synthesizing advanced collaborative filtering algorithms with a highly responsive, modern React architecture, this platform eliminates decision fatigue. It provides users with hyper-personalized clothing recommendations derived from granular preference mapping, past interactions, and real-time behavioral data. The core philosophy behind Smart Style was to build a system that not only understands what a user wants but anticipates their styling needs before they even search. The resulting application seamlessly bridges the gap between complex backend machine learning computations and an intuitive, lightning-fast frontend interface.",
    problemStatement: "The modern e-commerce landscape is plagued by generic recommendation engines that prioritize paid promotions over genuine user alignment. When shopping for fashion, users often encounter overwhelming catalogs filled with irrelevant items. Traditional platforms rely heavily on broad categorizations rather than granular, individualized style parsing. This leads to extreme decision fatigue, high bounce rates, and poor conversion. The engineering challenge was to design an intelligent pipeline capable of capturing nuanced style preferences (e.g., color theory, fit, occasion) and processing them through a recommendation matrix in real-time, all without degrading the client-side user experience.",
    solution: "I engineered a scalable, AI-driven collaborative filtering recommendation system natively integrated into a bespoke e-commerce interface. By decoupling the machine learning inference layer from the frontend delivery network, the system can compute complex user-item similarity matrices asynchronously. The frontend, built with React and TypeScript, acts as a lightning-fast presentation layer that securely fetches computed recommendations via RESTful APIs. User preferences are persistently tracked and synchronized using Firebase, ensuring that the recommendation engine continually learns and adapts to evolving tastes with zero latency perceptible to the end user.",
    features: [
      "Dynamic Collaborative Filtering: Increased recommendation relevance by 80% by analyzing behavioral data clusters.",
      "Real-Time Preference Syncing: Instantaneous UI updates across sessions powered by Firebase Realtime Database.",
      "Cross-Platform Responsiveness: A fluid, mobile-first CSS architecture that maintains 60 FPS scrolling.",
      "Asynchronous ML Pipelines: Offloaded heavy computation to ensure the client thread remains unblocked."
    ],
    systemArchitecture: "The architecture follows a strict decoupled monolithic pattern. The client application is constructed using React and TypeScript, ensuring strict type safety and component reusability. State management is handled contextually, minimizing unnecessary re-renders. The backend leverages Firebase for real-time data synchronization and authentication. Custom REST APIs serve as the transport layer, moving structured JSON payloads between the ML engine (Python/Scikit-learn) and the client.",
    architectureDiagramDesc: "[ Client (React/TS) ] <--> [ REST APIs ] <--> [ Firebase Auth/DB ] <--> [ ML Recommendation Engine ]",
    aiPipeline: "The AI core relies on a Matrix Factorization approach combined with K-Nearest Neighbors (KNN) to group users into stylistic cohorts. When a user interacts with a garment, their interaction vector is updated. The pipeline normalizes this vector, applies cosine similarity against the item matrix, and returns the top-N closest matches. This pipeline is highly optimized to run inference in under 200ms.",
    deployment: "The frontend is deployed on Vercel utilizing Edge caching to ensure minimal Time-To-First-Byte (TTFB). The backend services and database are hosted on Firebase, utilizing its serverless infrastructure to scale automatically based on traffic spikes.",
    technologies: ["React", "TypeScript", "JavaScript", "Firebase", "REST APIs", "CSS", "Scikit-learn", "Python", "Vercel"],
    challenges: [
      "Cold Start Problem: Overcoming the initial lack of data for new users by implementing an onboarding survey that bootstrapped their preference vector.",
      "State Synchronization: Ensuring that rapid, consecutive interactions (like/dislike) were batched and synchronized with Firebase without overwhelming the network or causing race conditions."
    ],
    lessonsLearned: [
      "Deepened understanding of memoization and virtualized lists in React to handle large arrays of recommended items without dropping frames.",
      "Learned to balance algorithmic complexity with network latency, ultimately choosing to pre-compute recommendations periodically rather than on every request."
    ],
    futureImprovements: [
      "Migrating the ML pipeline to TensorFlow.js for client-side edge inference.",
      "Implementing a GraphQL layer to reduce over-fetching of product metadata."
    ],
    screenshots: [],
    heroImage: "/images/smart_style.png",
    githubUrl: "#",
    liveDemoUrl: "#"
  },
  "quantvision-ai": {
    id: "quantvision-ai",
    title: "QuantVision AI Terminal",
    tagline: "AI Stock Prediction Platform",
    overview: "QuantVision is an end-to-end financial intelligence platform engineered to forecast market trends and visualize complex trading signals. Financial markets generate massive volumes of noisy, unstructured data every second. QuantVision cuts through this noise by integrating robust machine learning pipelines with real-time technical indicator analysis. The platform transforms raw, disparate market data into highly structured, actionable predictive insights. It serves as both a powerful analytical terminal and a demonstration of high-throughput data processing capabilities in a modern web environment.",
    problemStatement: "Financial time-series forecasting is notoriously difficult due to extreme market volatility and data noise. Traditional retail trading dashboards provide raw charts but lack the algorithmic intelligence required to synthesize multiple indicators into a cohesive prediction. Furthermore, processing thousands of historical data points, normalizing them, and running them through a neural network in a browser environment typically results in severe performance bottlenecks and UI freezing.",
    solution: "I developed an interactive, web-based AI terminal that predicts stock movements using optimized neural networks while performing comprehensive technical analysis across 15+ financial indicators. To maintain a fluid user experience, the system architecture heavily separates concerns: the frontend acts solely as a high-performance rendering engine (via Plotly and Next.js), while a dedicated Python backend handles the heavy lifting of data normalization, feature engineering, and TensorFlow inference. The result is a seamless, real-time dashboard that feels native and instantaneous.",
    features: [
      "Algorithmic Forecasting: Real-time prediction of stock directional movements achieving a validated 82% accuracy rate in backtesting.",
      "Interactive Telemetry: High-performance Plotly dashboards visualizing complex indicators (RSI, MACD, Bollinger Bands) without frame drops.",
      "Automated Preprocessing: Custom Python pipelines that automatically clean, normalize, and structure raw API data for ML ingestion.",
      "Responsive Terminal UI: A premium, dark-mode focused financial interface engineered with Next.js and Tailwind CSS."
    ],
    systemArchitecture: "The platform operates on a full-stack Next.js architecture. The frontend leverages React Server Components to minimize the client bundle size, offloading data fetching to the server. The data visualization layer is powered by Plotly.js, heavily memoized to prevent unnecessary re-renders. The backend is a Python-based REST API built with FastAPI, which communicates with a TensorFlow model for inference and Pandas for data manipulation.",
    architectureDiagramDesc: "[ Next.js Frontend ] <--> [ Next.js API Routes ] <--> [ FastAPI Server ] <--> [ TensorFlow Model & Pandas ]",
    aiPipeline: "The predictive engine utilizes a Long Short-Term Memory (LSTM) neural network built with TensorFlow. Time-series data is ingested, scaled using MinMaxScaler, and reshaped into 3D tensors. The LSTM captures temporal dependencies and non-linear patterns over a 60-day lookback window, outputting a normalized probability distribution of future price movements.",
    deployment: "The Next.js application is deployed globally on Vercel. The Python backend is containerized using Docker and deployed on a scalable cloud instance (AWS/Render) to ensure inference operations have dedicated compute resources without blocking web requests.",
    technologies: ["React", "Next.js", "Python", "TensorFlow", "Pandas", "NumPy", "Plotly", "FastAPI", "Tailwind CSS"],
    challenges: [
      "Data Normalization: Normalizing wildly disparate financial datasets (volume in millions vs. RSI bounded 0-100) into a cohesive matrix suitable for deep learning.",
      "Visualization Performance: Rendering massive arrays of financial candlestick data using Plotly without causing the browser to lock up during interaction."
    ],
    lessonsLearned: [
      "Mastered time-series data structuring and the critical importance of preventing data leakage during train/test splits.",
      "Gained advanced experience in optimizing React rendering cycles when dealing with heavy, constantly updating chart libraries."
    ],
    futureImprovements: [
      "Integrating WebSocket connections for sub-second, real-time tick data streaming.",
      "Adding sentiment analysis integration by scraping financial news headlines and passing them through a transformer model."
    ],
    screenshots: [],
    heroImage: "/images/quantvision.png",
    githubUrl: "#",
    liveDemoUrl: "#"
  },
  "portfolio": {
    id: "portfolio",
    title: "AI Operating System Portfolio",
    tagline: "Cinematic Engineering Experience",
    overview: "This portfolio is not merely a collection of links; it is a meticulously engineered interactive experience designed to mimic an advanced AI Operating System. Built to demonstrate deep expertise in modern frontend architecture, 3D rendering, and UX design, the platform pushes the boundaries of what a web application can feel like. It combines fluid, cinematic animations with dense, recruiter-optimized engineering data. Every interaction, transition, and component was designed from scratch to reflect a commitment to performance, elegance, and extreme attention to detail.",
    problemStatement: "Traditional software engineering portfolios are often static, text-heavy, and uninspiring, failing to differentiate the candidate in a highly competitive market. Conversely, highly creative portfolios often sacrifice readability, hiding crucial engineering facts behind frustrating animations or confusing navigation. The challenge was to create a platform that achieves both extremes: an overwhelmingly impressive cinematic aesthetic that still allows a recruiter to extract every critical piece of information (experience, skills, projects) within 30 seconds.",
    solution: "I architected a custom Single Page Application using Next.js and Framer Motion to orchestrate complex, scroll-linked animations and page transitions. By utilizing Three.js and React Three Fiber, I embedded interactive WebGL elements (such as the AI Core and Neural Synapses) without compromising the DOM's accessibility or flow. The information architecture was aggressively optimized: critical data is presented instantly, while deep engineering case studies (like the one you are reading) are accessible via smooth, full-screen route transitions.",
    features: [
      "WebGL Integration: Custom interactive 3D particle systems and neural networks running at a stable 60 FPS.",
      "Scroll-Linked Typography: Advanced text assembly, parallax effects, and kinetic typography powered by Framer Motion.",
      "Recruiter-Optimized UX: A highly dense, structured information hierarchy ensuring instantaneous access to credentials and metrics.",
      "Dynamic Routing: Seamless, app-like transitions between the main OS interface and deep project case studies."
    ],
    systemArchitecture: "The application is built on Next.js App Router for optimal SEO and performance. Framer Motion handles all UI choreography, heavily utilizing useScroll and useTransform for physics-based animations. The 3D layer is powered by React Three Fiber, deliberately unmounted when out of view via Intersection Observers to save GPU resources. Tailwind CSS drives the utility-first styling system, enabling rapid iteration of the dark-mode glassmorphism aesthetic.",
    architectureDiagramDesc: "[ Next.js App Router ] --> [ Framer Motion (Orchestration) ] --> [ React Three Fiber (WebGL Layer) ]",
    aiPipeline: "While this project does not contain a backend ML pipeline, it visually simulates an AI environment using advanced programmatic noise generation, procedural particle physics, and algorithmic node connections in Three.js.",
    deployment: "Deployed natively on Vercel with strict optimizations: aggressive image caching, minimal bundle sizes, and optimal Core Web Vitals to ensure instantaneous load times globally.",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Three.js", "React Three Fiber", "Tailwind CSS", "Lucide React", "Vercel"],
    challenges: [
      "Performance Optimization: Balancing heavy WebGL rendering with complex Framer Motion layout animations without causing frame drops or layout shifts on lower-end devices.",
      "Hydration Mismatches: Resolving complex React hydration errors caused by programmatic random generation in the particle systems."
    ],
    lessonsLearned: [
      "Mastered the React Three Fiber ecosystem and learned how to safely bridge the declarative React DOM with the imperative WebGL canvas.",
      "Gained deep expertise in orchestrating complex, timeline-based animation sequences using Framer Motion."
    ],
    futureImprovements: [
      "Implementing a global state manager (Zustand) to persist OS state across deep navigations.",
      "Adding a custom WebGL shader for the hero background to replace the current CSS-based gradients."
    ],
    screenshots: [],
    heroImage: "/images/workspace.png",
    githubUrl: "https://github.com/venkatanagasai01",
    liveDemoUrl: "#"
  }
};
