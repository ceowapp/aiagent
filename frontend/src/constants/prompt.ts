export const VALUE_CONSTRAINTS = {
  price: {
    strategy: `
    If the price is not provided, or if the provided value is 0, empty, null, undefined, or invalid, generate a realistic price based on the product category, aligned with industry standards. 
    If a price value is explicitly defined, return it as is, ensuring it adheres to any specified constraints or ranges for that product.`,
    rules: {
      decimal: 2,
      minPrice: 0.99,
      maxPrice: 999999.99,
      rounding: "Round up to nearest .99",
    }
  },
  profit: {
    strategy: `
    If the profit is not provided, or if the provided value is 0, empty, null, undefined, or invalid, generate a realistic profit based on the product category, aligned with industry standards. 
    If a profit value is explicitly defined, return it as is, ensuring it adheres to any specified constraints or ranges for that product.`,
    rules: {
      decimal: 2,
      minPrice: 0.99,
      maxPrice: 999999.99,
      rounding: "Round up to nearest .99",
    }
  },
  costPerItem: {
    strategy: `
    If the cost per item is not provided, or if the provided value is 0, empty, null, undefined, or invalid, generate a realistic cost per item based on the product category, aligned with industry standards. 
    If a cost per item value is explicitly defined, return it as is, ensuring it adheres to any specified constraints or ranges for that product.`,
    rules: {
      decimal: 2,
      minPrice: 0.99,
      maxPrice: 999999.99,
      rounding: "Round up to nearest .99",
    }
  },
  weight: {
    strategy: `
    If the weight is not provided, or if the provided value is 0, empty, null, undefined, or invalid, generate a realistic weight based on the product category, aligned with industry standards. 
    The weight value can never be zero, and should always be a positive value greater than zero, no matter the product type (whether physical or digital). 
    For digital products that may not have a physical weight, a minimal weight will be assigned to satisfy the weight constraint.
    If a weight is explicitly defined, return it as is, ensuring it adheres to any specified constraints or ranges for that product.`,
    rules: {
      decimal: 2,
      minPrice: 0.01,
      maxPrice: 999999.99,
      rounding: "Round up to nearest .99",
    }
  }
};

export const LENGTH_CONSTRAINTS = {
  title: {
    min: 10,
    max: 80,
    description: "Title MUST be between 10-80 characters, INCLUDING spaces and punctuation. **UNDER NO CIRCUMSTANCES** should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  category: {
    min: 10,
    max: 60,
    description: "Category MUST be between 10-60 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  description: {
    min: 100,
    max: 250,
    description: "Description MUST be between 100-250 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  metaDescription: {
    min: 100,
    max: 250,
    description: "Meta description MUST be between 100-250 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  shortDescription: {
    min: 100,
    max: 250,
    description: "Short description MUST be between 100-250 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  bodyContent: {
    min: 500,
    max: 1500,
    description: "Body content MUST be between 500-1500 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  urlHandle: {
    min: 10, 
    max: 150,
    description: "URL handle MUST be between 10-150 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  },
  tags: {
    min: 8,
    max: 10,
    description: "Tags MUST have between 8-10 unique tags."
  },
  pageTitle: {
    min: 10,
    max: 80,
    description: "The page title MUST be between 10-80 characters, INCLUDING spaces and punctuation. UNDER NO CIRCUMSTANCES should the character count **FALL BELOW the minimum** or **EXCEED the maximum limit**."
  }
};

/**
 * @const BASE_REQUIREMENTS
 * @description Provides structure and content guidelines for SEO optimization.
 * @property {object} title - Title structure and requirements.
 * @property {object} description - Short description format for SEO.
 * @property {object} pricing - Product price extracted from the input data.
 * @property {object} weight - Product weight extracted from the input data.
 * @property {object} seoOptimization - SEO Optimization requirements for product listings.
 * @property {object} contentGuidelines - Content guidelines for product listings.
 * @property {object} valueGeneration - Value generation strategies for missing data fields.
 */
const BASE_REQUIREMENTS = {
  title: {
    structure: {
      format: '[Primary Keyword] + [USP] + [Brand]',
      length: LENGTH_CONSTRAINTS.title,
      requirements: [
        'Front-load primary keyword for SEO visibility',
        'Include distinctive USP or key benefit that differentiates product',
        'End with brand name if space permits (maintain brand consistency)',
        'Avoid keyword stuffing - maintain natural readability',
        'Use separator symbols ("|" or "-") between elements',
        'Include model/size/variant if relevant to search intent',
        'Keep most important terms in first 50-60 characters'
      ]
    }
  },
  description: {
    structure: {
      format: 'Problem → Solution → Value → CTA',
      length: LENGTH_CONSTRAINTS.description,
      requirements: [
        'Open with compelling problem statement or pain point',
        'Present product as ideal solution with key features',
        'Highlight unique value propositions and benefits',
        'End with clear, action-oriented CTA',
        'Incorporate 2-3 relevant keywords naturally',
        'Include important product specifications'
      ]
    }
  },
  category: {
    length: LENGTH_CONSTRAINTS.category,
    requirements: [
      'Use standardized Shopify category nomenclature',
      'Include primary and secondary categories if applicable',
      'Match search intent and product type',
      'Align with existing category hierarchy',
      'Consider category-specific SEO patterns',
      'Use breadcrumb-friendly structure',
      'Maintain consistency with marketplace standards'
    ]
  },
};

/**
 * @const BASE_REWRITE_REQUIREMENTS
 * @description Provides structure and content guidelines for SEO optimization.
 * @property {object} title - Title structure and requirements.
 * @property {object} description - Short description format for SEO.
 * @property {object} pricing - Product price extracted from the input data.
 * @property {object} weight - Product weight extracted from the input data.
 * @property {object} seoOptimization - SEO Optimization requirements for product listings.
 * @property {object} contentGuidelines - Content guidelines for product listings.
 * @property {object} valueGeneration - Value generation strategies for missing data fields.
 */

export const BASE_REWRITE_REQUIREMENTS = {
  ...BASE_REQUIREMENTS,     
  ...VALUE_CONSTRAINTS, 
};

/**
 * @const BASE_REWRITE_OUTPUT_FORMAT
 * @description Defines the expected output format for rewrite tasks.
 * @property {string} title - Title string with 50-60 character length.
 * @property {string} description - Description string with 150-200 character length.
 * @property {string} category - Product category name.
 * @property {number} price - Numeric price of the product.
 * @property {number} costPerItem - Numeric cost per item.
 * @property {number} profit - Numeric profit calculated from price and cost.
 * @property {number} weight - Weight in kilograms.
 */
export const BASE_REWRITE_OUTPUT_FORMAT = {
 title: "string",
 description: "string",
 category: "string",
 price: "number",
 costPerItem: "number",
 profit: "number",
 weight: "number",
};

/**
 * @const BASE_SEO_REQUIREMENTS
 * @description Provides structure and content guidelines for SEO optimization.
 * @property {object} title - Title structure and requirements.
 * @property {object} shortDescription - Short description format for SEO.
 * @property {object} metaDescription - Meta description format for SEO.
 * @property {object} bodyContent - Body content structure with SEO considerations.
 * @property {object} urlHandle - URL handle guidelines.
 * @property {object} pageTitle - Page title requirements.
 * @property {object} category - Category requirements for SEO.
 * @property {object} technicalDetails - Specifications format and requirements.
 * @property {object} schemaMarkup - Schema markup guidelines and required fields.
 */
export const BASE_SEOMULTIPLE_REQUIREMENTS = {
  ...VALUE_CONSTRAINTS,
  title: BASE_REQUIREMENTS.title,
  shortDescription: BASE_REQUIREMENTS.description,
  category: BASE_REQUIREMENTS.category,
  metaDescription: {
    structure: {
      format: '[Pain Point] + [Target Audience] + [Unique Solution] + [Benefit] + [Emotional CTA]',
      length: LENGTH_CONSTRAINTS.metaDescription,
      requirements: [
        'Include primary keyword naturally in first 50 characters',
        'Address specific user pain point with empathy',
        'Present quantifiable value proposition', 
        'End with action-oriented emotional CTA',
        'Use power words and emotional triggers',
        'Include trust signals (awards, certifications, stats)',
        'Optimize for featured snippets'
      ]
    }
  },
  bodyContent: {
    structure: {
      format: 'HTML with semantic structure',
      length: LENGTH_CONSTRAINTS.bodyContent,
      requirements: {
        primary: {
          sections: [
            'Include feature-benefit comparison matrix',
            'Include social proof elements',
            'Include use Cases & applications',
            'Optimize for mobile viewing',
            'Maintain 1-2% keyword density',
            'Include table of contents',
            'Add LSI keywords'
          ],
          seoRequirements: {
            headingHierarchy: {
              h1: 'Product Title with Primary Keyword (Once)',
              h2: 'Major Sections with User Intent Focus',
              h3: 'Subsections with LSI Keywords',
              h4: 'Feature Groups with Benefits',
              h5: 'Specific Details and Examples',
              h6: 'Supporting Content Elements'
            },
            keywordStrategy: {
              primaryKeyword: {
                density: {
                  body: '1-2%',
                  headers: '2-3%',
                },
                placement: [
                  'Above-fold content',
                  'First 100 words',
                  'Strategic headers',
                  'Rich snippets',
                  'Meta elements',
                  'Image alt text'
                ]
              },
              secondaryKeywords: {
                count: '3-5 per section',
                integration: 'Natural language flow',
                contextMapping: 'User intent based'
              },
              lsiKeywords: {
                minimum: 12,
                contextRelevance: true,
                semanticClustering: true,
                intentMapping: true
              }
            }
          },
          contentOptimization: {
            readability: {
              paragraphLength: '2-3 sentences (mobile-optimized)',
              sentenceStructure: 'Dynamic and engaging',
              fleschKincaid: '60-70',
              bulletPoints: 'Progressive disclosure format',
              contentScoring: 'AI-powered readability analysis'
            },
            engagement: {
              interactiveElements: true,
              multimediaContent: true,
              userGeneratedContent: true,
              gamification: 'Where appropriate'
            }
          },
          technicalRequirements: {
            mobileOptimization: {
              responsive: true,
              touchFriendly: true,
              acceleratedMobilePages: true,
              loadTime: '< 3 seconds',
              progressiveWebApp: true,
              coreWebVitals: {
                LCP: '< 2.5s',
                FID: '< 100ms',
                CLS: '< 0.1'
              }
            },
            accessibility: {
              wcag: 'Level AAA compliance',
              aria: 'Enhanced implementation',
              colorContrast: '7:1 optimal',
              keyboardNavigation: true,
              voiceControl: true,
              screenReaderOptimized: true
            }
          },
          userExperience: {
            interactivity: {
              features: [
                'Smart expandable sections',
                'Gesture-based navigation',
                'Dynamic filtering with AI',
                'Augmented reality preview',
                'Voice search capability',
                'Personalized recommendations'
              ]
            },
            crossSelling: {
              related: 'AI-powered contextual recommendations',
              bundles: 'Dynamic package offerings',
              personalization: 'User behavior based suggestions',
              comparison: 'Interactive product comparison'
            }
          }
        }
      }
    }
  },
  tags: {
    structure: {
      format: 'string (comma-separated)',
      requirements: [
        'Primary keyword variations with intent modifiers',
        'Long-tail keywords with high conversion potential',
        'Product categories with hierarchical structure',
        'Semantic topic clusters',
        'User intent markers',
        '8-10 strategically selected tags',
        'Geographic and demographic relevance markers'     
      ]
    }
  },
  pageTitle: {
    structure: {
      format: '[Product Name] + [USP] - [Brand] | [Store Name] + [Intent Modifier]',
      length: LENGTH_CONSTRAINTS.pageTitle,
      requirements: [
        'Front-load primary keyword',
        'Include unique value proposition',
        'Maintain brand consistency',
        'Target search intent',
        'Optimize for CTR',
        'Include power words',
        'Match user search patterns'
      ]
    }
  },
  technical: {
    structure: {
      format: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        details: {
          '@type': 'Technical',
          '[Feature]': '[Specification]'
        },
        additionalProperty: {
          '[Feature]': '[Specification]'
        }
      },
      requirements: [
        'Comprehensive specifications with metric/imperial measurements',
        'Component-level compatibility matrix',
        'Material composition with sustainability metrics',
        'Safety certifications and compliance standards',
        'Installation and maintenance requirements',
        'Operating conditions and environment specs',
      ],
      requiredFields: [
        '@context',
        '@type',
        'details',
      ],
    }
  },
  product: {
    structure: {
      format: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'string',
        description: 'string',
        brand: {
          '@type': 'Brand',
          name: 'string',
          logo: 'string',
          foundingDate: 'string',
          founder: {
            '@type': 'Person',
            name: 'string'
          }
        },
        offers: {
          '@type': 'Offer',
          discountCode: 'string',
          promotionEndDate: 'string',
          minimumPurchase: 'number',
          loyaltyPoints: 'number',
          giftWrapping: 'string',
          shippingDetails: {
            type: 'string',
            cost: 'number',
            estimatedDelivery: 'string',
            freeShippingThreshold: 'number'
          },
          warrantyDuration: 'string',
          availability: 'string',
          url: 'string',
          itemCondition: 'string',
          inventoryLevel: 'number'
        },
        sku: 'string',
        mpn: 'string',
        category: 'string',
        additionalProperty: [{
          '@type': 'PropertyValue',
          name: 'string',
          value: 'string'
        }],
        image: [
          {
            '@type': 'ImageObject',
            contentUrl: 'string',
            thumbnailUrl: 'string',
            description: 'string'
          }
        ],
        productionDate: 'string',
        sustainability: {
          carbonFootprint: 'number',
          recycledContent: 'number',
          certifications: ['string']
        }
      },
      requirements: [
        'SKU, UPC, EAN, and other product identifiers',
        'Pricing tiers, bulk discounts, and currency options',
        'Real-time inventory status and restock dates',
        'Brand hierarchy, manufacturer details, and origin',
        'Global ratings aggregated by source/region',
        'Review velocity and sentiment analysis',
        'Rich media assets (images, videos, 3D models)',
        'Production origin and ethical manufacturing details',
        'Shipping dimensions and weight specs',
        'Advanced inventory and variant tracking',
        'Cross-border compliance information',
        'Detailed warranty terms, coverage periods, and claim process'
      ],
      requiredFields: [
        '@context',
        '@type',
        'name',
        'description',
        'brand',
        'offers',
      ],
    }
  },
  faq: {
    structure: {
      format: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [{
          '@type': 'Question',
          name: 'string',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'string'
          }
        }]
      },
      requirements: [
        `Segmented questions by topic/category`,
        'Dynamic content personalization',
        `Contextual related questions and follow-ups`,
        `Comprehensive Source Citations and Expert Validation`,
        `Usage scenarios and best practices`,
        `Detailed troubleshooting guides`,
        `Comparative analysis vs alternatives`,
        `Step-by-step instructions for clarity`,
        `Common misconceptions and clarifications`,
        `FAQs prioritized by user needs or frequency of queries`,
        `Quick tips and key takeaways for every question`
      ],
      requiredFields: [
        '@context',
        '@type',
        'mainEntity'
      ],
    }
  },
  review: {
    structure: {
      format: {
        '@context': 'https://schema.org',
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'string',
          verifiedBuyer: 'boolean',
          socialMediaProfile: 'string'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 'number',
          bestRating: 'number',
          worstRating: 'number'
        },
        reviewBody: 'string',
        datePublished: 'string',
        publisher: {
          '@type': 'Organization',
          name: 'string'
        },
        applicationContext: {
          useCase: 'string',
          environment: 'string',
          productConfiguration: 'string'
        },
        pros: ['string'],
        cons: ['string'],
        mediaAssets: [{
          '@type': 'MediaObject',
          contentUrl: 'string',
          type: 'string'
        }]
      },
      requirements: [
        'Verified purchase badges',
        'Detailed rating breakdowns by criteria',
        'Pros and cons structured analysis',
        'Review helpfulness votes',
        'Media attachments in reviews',
        'Expert/professional reviews',
        'Response handling and updates',
        'Geographic location tags',
        'Usage duration data',
        'Sentiment analysis tags',
        'Cross-platform review aggregation',
        'Follow-up feedback or updates from reviewers',
        'Responses from the company or service provider'
      ],
      requiredFields: [
        '@context',
        '@type',
        'author',
        'reviewRating',
        'reviewBody'
      ],
    }
  },
};

/**
 * @const BASE_SEO_OUTPUT_FORMAT
 * @description Specifies the output format required for SEO data.
 * @property {string} title - Title within 50-60 characters.
 * @property {string} shortDescription - Short description between 150-200 characters.
 * @property {string} bodyContent - HTML-formatted body content.
 * @property {string} metaDescription - Meta description within 150-160 characters.
 * @property {string} category - Product category.
 * @property {string} pageTitle - Page title formatted for SEO.
 * @property {string} urlHandle - URL handle in SEO-friendly format.
 * @property {string} tags - Comma-separated tags.
 * @property {object} technicalDetails - JSON object with product specs.
 * @property {object} schemaMarkup - JSON-LD schema markup object.
 */
export const BASE_SEO_OUTPUT_FORMAT = {
 title: "string",
 shortDescription: "string",
 bodyContent: "string (HTML)",
 metaDescription: "string",
 category: "string",
 pageTitle: "string",
 urlHandle: "string",
 tags: "string (comma-separated)",
 product: "object",
 review: "object",
 faq: "object",
 technical: "object",
 price: "number",
 costPerItem: "number",
 profit: "number",
 weight: "number",
};

/**
 * @const COMMAND_PROMPTS
 * @description Describes commands with specific roles and focuses for various optimization types.
 * @property {object} REWRITE - Command prompt settings for copywriting and conversion optimization.
 * @property {object} SEOMULTIPLE - Command prompt for multiple SEO fields.
 * @property {object} SEOSINGLE - Command prompt for single field optimization.
 */
export const COMMAND_PROMPTS = {
 REWRITE: {
   role: "Copywriter",
   focus: "Conversion optimization",
   additional: "Brand voice, persuasive language"
 },
 SEOMULTIPLE: {
   role: "SEO Specialist",
   focus: "Search visibility",
   additional: "Technical SEO, schema markup"
 },
 SEOSINGLE: {
   role: "Field Specialist",
   focus: "Single field optimization",
   additional: "Field-specific requirements"
 }
};

/**
 * BASE_SCHEMA_MARKUP_REQUIREMENTS
 * 
 * Basic guidelines for schema markup, covering essential fields for product, FAQ, and review schemas.
 * 
 * @property {object} product - Product schema fields like `name`, `description`, `brand`, and optional fields like `sku` and `aggregateRating`.
 * @property {object} faq - FAQ schema fields with a focus on `mainEntity`, providing clear questions and answers.
 * @property {object} review - Review schema fields, including `author`, `reviewRating`, and `reviewBody`.
 * @property {string} schemaInstructions - General instructions for following schema.org standards.
 * 
 * @example
 * // Access product schema requirements:
 * BASE_SCHEMA_MARKUP_REQUIREMENTS.product;
 * 
 * // View general schema instructions:
 * BASE_SCHEMA_MARKUP_REQUIREMENTS.schemaInstructions;
 */
/*export const BASE_SCHEMA_REQUIREMENTS = {
  technical: 
    "Full specifications with metric/imperial measurements, " +
    "Component-level compatibility matrix, " +
    "Material composition, grade, and certifications, " +

  product: 
    "SKU, UPC, EAN, and other product identifiers, " +
    "Pricing tiers, bulk discounts, and currency options, " +
    "Real-time inventory status and restock dates, " +
    "Brand hierarchy, manufacturer details, and origin, " +
    "Global ratings aggregated by source/region, " +
    "Review velocity and sentiment analysis, " +
    "Rich media assets (images, videos, 3D models), " +
    "Installation and maintenance requirements, " +
    "Safety certifications and compliance standards, " +
    "Operating conditions and environment specs, " +
    "Detailed warranty terms, coverage periods, and claim process, " +
    "Shipping dimensions and weight specs",

  faq: 
    "Segmented questions by topic/category, " +
    "Related questions and follow-ups, " +
    "Source citations and expert validation, " +
    "Usage scenarios and best practices, " +
    "Troubleshooting guides, " +
    "Comparative analysis vs alternatives",

  review: 
    "Verified purchase badges, " +
    "Detailed rating breakdowns by criteria, " +
    "Review helpfulness votes, " +
    "Media attachments in reviews, " +
    "Expert/professional reviews, " +
    "Response handling and updates, " +
    "Geographic location tags, " +
    "Usage duration data",

  organization: 
    "Company details and registration info, " +
    "Support contact methods, " +
    "Social proof and certifications, " +
    "Physical location coordinates, " +
    "Business hours and availability",

  offer: 
    "Price validity periods, " +
    "Bulk pricing tiers, " +
    "Eligibility requirements, " +
    "Available payment methods, " +
    "Shipping options and restrictions",

  general: 
    "Implement nested schemas with proper parent-child relationships, " +
    "Validate markup using Schema.org testing tools, " +
    "Follow latest Schema.org vocabulary and syntax, " +
    "Include required and recommended properties, " +
    "Add appropriate meta tags for search engines"
};*/

/**
 * BASE_SCHEMA_MARKUP_OUTPUT
 * 
 * Defines the JSON-LD schema markup structure for product, FAQ, and review information, following schema.org standards.
 * 
 * @property {object} product - Schema for product details.
 *   - `@context`: Schema context URL for JSON-LD format.
 *   - `@type`: Defines the schema type as "Product".
 *   - `name`: Product name.
 *   - `description`: Product description.
 *   - `brand`: Contains brand details with `@type` as "Brand" and `name`.
 *   - `offers`: Offer details such as `price`, `priceCurrency`, `availability`, and `url`.
 *   - `sku`: Stock Keeping Unit (SKU).
 *   - `mpn`: Manufacturer Part Number.
 *   - `category`: Product category.
 *   - `additionalProperty`: Array of additional properties with `name` and `value`.
 * 
 * @property {object} faq - Schema for frequently asked questions.
 *   - `@context`: Schema context URL.
 *   - `@type`: Defines the schema type as "FAQPage".
 *   - `mainEntity`: Array of questions, each with:
 *     - `name`: Question text.
 *     - `acceptedAnswer`: Answer with `text`.
 * 
 * @property {object} review - Schema for customer reviews.
 *   - `@context`: Schema context URL.
 *   - `@type`: Defines the schema type as "Review".
 *   - `author`: Review author information with `name`.
 *   - `reviewRating`: Rating details with `ratingValue` and `bestRating`.
 *   - `reviewBody`: Text of the review.
 *   - `datePublished`: Publication date of the review.
 * 
 * @example
 * // Example of accessing product schema structure
 * BASE_SCHEMA_MARKUP_OUTPUT.product;
 * 
 * // Example of accessing FAQ schema structure
 * BASE_SCHEMA_MARKUP_OUTPUT.faq.mainEntity[0];
 */
export const BASE_SCHEMA_OUTPUT = {
  technical: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    details: {
      '@type': 'Technical',
      feature: 'string', 
      specification: 'string'
    },
  },
  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'string',
    description: 'string',
    brand: {
      '@type': 'Brand',
      name: 'string'
    },
    offers: {
      '@type': 'Offer',
      discountCode: 'string',
      promotionEndDate: 'string',
      minimumPurchase: 'number',
      loyaltyPoints: 'number',
      giftWrapping: 'string',
      shippingDetails: 'string',
      warrantyDuration: 'string',
      priceCurrency: 'string',
      availability: 'string',
      url: 'string'
    },
    sku: 'string',
    mpn: 'string',
    category: 'string',
    additionalProperty: [{
      '@type': 'PropertyValue',
      name: 'string',
      value: 'string'
    }]
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: 'string',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'string'
      }
    }]
  },
  review: {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: 'string'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 'number',
      bestRating: 'number'
    },
    reviewBody: 'string',
    datePublished: 'string'
  }
};

/**
 * SEOSINGLE_BASE_REQUIREMENTS
 * 
 * Contains structured prompts for optimizing SEO attributes, ensuring best practices for titles, schema markup, technical details, URLs, tags, and content.
 * 
 * @property {string} title - Guidelines for optimizing page titles.
 *   - Front-load primary keywords.
 *   - Include product type and brand.
 *   - Add a compelling modifier within 50-60 characters.
 *   - Match user search intent.
 * 
 * @property {string} bodyContent - General content guidelines.
 * 
 * @property {string} schemaMarkup - Instructions for implementing schema markup.
 *   - Lists JSON structure for schema fields, including `Product`, `FAQ`, and `Review` schema.
 *   - Ensures proper nesting and adherence to schema.org standards.
 * 
 * @property {string} technicalDetails - Checklist for technical detail specifications.
 *   - Requirements for including measurements, compatibility, material details, and warranty info.
 * 
 * @property {string} urlHandle - Standards for creating URL handles.
 *   - Include main keyword, hyphenate spaces, keep under 60 characters, lowercase only, avoid special characters.
 * 
 * @property {string} pageTitle - Instructions for crafting effective page titles.
 *   - Primary keyword should be included, match page content, unique across site, and ideally 50-60 characters.
 * 
 * @property {string} category - Best practices for categorizing content.
 *   - Use standardized naming conventions, specify primary and secondary categories, and align with site structure.
 * 
 * @property {string} shortDescription - Guidelines for writing concise descriptions.
 *   - Length of 150-200 characters, includes primary keyword, clear value proposition, CTA, and emotional triggers.
 * 
 * @property {string} tagsStrategy - Recommendations for tag creation and usage.
 *   - Primary keyword variations, long-tail keywords, relevant product categories, 8-10 relevant tags.
 * 
 * @property {string} metaDescription - Guidelines for meta descriptions.
 *   - Include primary keyword, clear value proposition, compelling CTA, length of 150-160 characters, and emotional triggers.
 * 
 * @example
 * // Example of accessing the title prompt
 * console.log(SEOSINGLE_BASE_REQUIREMENTS.title);
 * 
 * // Example of accessing schema markup prompt
 * console.log(SEOSINGLE_BASE_REQUIREMENTS.schemaMarkup);
 */

/**
 * BASE_SEOSINGLE_REQUIREMENTS
 * 
 * Basic guidelines for schema markup, covering essential fields for product, FAQ, and review schemas.
 * 
 * @property {object} product - Product schema fields like `name`, `description`, `brand`, and optional fields like `sku` and `aggregateRating`.
 * @property {object} faq - FAQ schema fields with a focus on `mainEntity`, providing clear questions and answers.
 * @property {object} review - Review schema fields, including `author`, `reviewRating`, and `reviewBody`.
 * @property {string} schemaInstructions - General instructions for following schema.org standards.
 * 
 * @example
 * // Access product schema requirements:
 * BASE_SCHEMA_MARKUP_REQUIREMENTS.product;
 * 
 * // View general schema instructions:
 * BASE_SCHEMA_MARKUP_REQUIREMENTS.schemaInstructions;
 */

/**
 * Base requirements for AI response formatting and validation
 * Used to ensure consistent, valid outputs across different AI response types
 * Includes formatting, content, technical, and validation requirements
 * @constant
 */

export const BASE_RESPONSE_REQUIREMENTS = `
  1. Format & Structure
     - Response must be ONLY valid JSON without code blocks or markdown
     - Response must be valid JSON, parseable by JSON.parse()
     - Response ready for direct API return
     - Compatible with OpenAI response handling
     - All JSON keys must be properly quoted
     - Proper nesting of objects and arrays
     - No cleanup or post-processing needed 
     - No trailing whitespace allowed
     - No \`\`\`json markers or backticks in response
     - No undefined values
     - No partial JSON objects
     - No null values unless explicitly allowed
     - All required fields must be present
     - All fields must be present even if empty unless explicitly specified otherwise
     - No comments or additional text outside JSON structure
     - No additional fields outside format
     - Valid data types for each field

  2. Content Quality
     - All content must be relevant to the given context
     - No placeholder or generic content
     - Maintain consistent style throughout
     - Maintain natural language flow
     - No truncated content
     - Complete sentences and sections
     - No duplicate content across sections
     - Ensure keyword density stays within 1-2%
     - Long-tail keywords must be naturally integrated
     - Primary keyword must appear in title, meta description, and first paragraph
     - Avoid keyword stuffing
     - Ensure all responses are concise, grammatically correct.

  3. Data Validation
     - All numeric-related values must be numeric and valid
     - All numeric values must fall within their defined minimum and maximum bounds 
     - All texts/strings must respect length limits if specified
     - All dates must be in ISO format
     - All URLs must be properly formatted
     - All percentages must be valid numbers
     - All measurements must include units unless explicitly specified otherwise
     - All fields must meet requirements and adhere to constraints if specified
     - Ensure data accuracy, consistency, and compliance.

  4. Token Management and Rate Limiting Compliance
     - Response must fit within max_tokens limit
     - Efficient use of tokens for complete response
     - Follows rate limiting requirements
`;
