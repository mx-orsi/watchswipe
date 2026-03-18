import { Watch } from "@/types/watch";

/**
 * In-app catalog source of truth for swipe/detail UI.
 * TODO: Eventually move to a DB-backed catalog (Supabase watches/watch_variants)
 * and load via API; keep seed in sync with supabase/seed.sql until then.
 */
export const seedWatches: Watch[] = [
  {
    id: "baltic-aquascaphe",
    brand: "Baltic",
    model: "Aquascaphe",
    base_price: 750,
    case_size: "39mm",
    movement: "Automatic",
    water_resistance: "200m",
    category: "Dive",
    description:
      "A modern take on a classic skin diver with a slim profile and vintage-inspired details.",
    brand_url: "https://baltic-watches.com",
    variants: [
      {
        id: "baltic-aquascaphe-blue",
        watch_id: "baltic-aquascaphe",
        color_name: "Deep Blue",
        image_url:
          "https://images.watchswipe.app/baltic-aquascaphe-deep-blue.jpg",
        hex_color: "#0E294B"
      },
      {
        id: "baltic-aquascaphe-black",
        watch_id: "baltic-aquascaphe",
        color_name: "Black",
        image_url:
          "https://images.watchswipe.app/baltic-aquascaphe-black.jpg",
        hex_color: "#111111"
      },
      {
        id: "baltic-aquascaphe-green",
        watch_id: "baltic-aquascaphe",
        color_name: "Green",
        image_url:
          "https://images.watchswipe.app/baltic-aquascaphe-green.jpg",
        hex_color: "#073B3A"
      }
    ]
  },
  {
    id: "lorier-neptune",
    brand: "Lorier",
    model: "Neptune",
    base_price: 499,
    case_size: "39mm",
    movement: "Automatic",
    water_resistance: "200m",
    category: "Dive",
    description:
      "A compact, gilt-accented diver with strong vintage cues and daily-wear versatility.",
    brand_url: "https://lorierwatches.com",
    variants: [
      {
        id: "lorier-neptune-gilt-black",
        watch_id: "lorier-neptune",
        color_name: "Gilt Black",
        image_url:
          "https://images.watchswipe.app/lorier-neptune-gilt-black.jpg",
        hex_color: "#1A1613"
      },
      {
        id: "lorier-neptune-blue",
        watch_id: "lorier-neptune",
        color_name: "Navy",
        image_url: "https://images.watchswipe.app/lorier-neptune-navy.jpg",
        hex_color: "#12213F"
      }
    ]
  },
  {
    id: "traska-commuter",
    brand: "Traska",
    model: "Commuter",
    base_price: 635,
    case_size: "36mm",
    movement: "Automatic",
    water_resistance: "100m",
    category: "Field",
    description:
      "A compact daily-wearer with hardened steel and subtle sunburst dials.",
    brand_url: "https://traskawatch.com",
    variants: [
      {
        id: "traska-commuter-mint",
        watch_id: "traska-commuter",
        color_name: "Mint Green",
        image_url: "https://images.watchswipe.app/traska-commuter-mint.jpg",
        hex_color: "#9FE2BF"
      },
      {
        id: "traska-commuter-smoke",
        watch_id: "traska-commuter",
        color_name: "Charcoal",
        image_url: "https://images.watchswipe.app/traska-commuter-smoke.jpg",
        hex_color: "#303339"
      },
      {
        id: "traska-commuter-salmon",
        watch_id: "traska-commuter",
        color_name: "Salmon",
        image_url: "https://images.watchswipe.app/traska-commuter-salmon.jpg",
        hex_color: "#F2A28F"
      }
    ]
  },
  {
    id: "zelos-mako",
    brand: "Zelos",
    model: "Mako",
    base_price: 449,
    case_size: "40mm",
    movement: "Automatic",
    water_resistance: "300m",
    category: "Dive",
    description:
      "A bold diver with textured dials, strong lume, and premium materials at an accessible price.",
    brand_url: "https://zeloswatches.com",
    variants: [
      {
        id: "zelos-mako-teal",
        watch_id: "zelos-mako",
        color_name: "Teal",
        image_url: "https://images.watchswipe.app/zelos-mako-teal.jpg",
        hex_color: "#0F766E"
      },
      {
        id: "zelos-mako-sand",
        watch_id: "zelos-mako",
        color_name: "Sand",
        image_url: "https://images.watchswipe.app/zelos-mako-sand.jpg",
        hex_color: "#C7A17A"
      }
    ]
  },
  {
    id: "nodus-sector-field",
    brand: "Nodus",
    model: "Sector Field",
    base_price: 575,
    case_size: "38mm",
    movement: "Automatic",
    water_resistance: "150m",
    category: "Field",
    description:
      "A modern field watch with a sector dial layout and sharp finishing.",
    brand_url: "https://noduswatches.com",
    variants: [
      {
        id: "nodus-sector-field-cream",
        watch_id: "nodus-sector-field",
        color_name: "Cream",
        image_url:
          "https://images.watchswipe.app/nodus-sector-field-cream.jpg",
        hex_color: "#F5E7CF"
      },
      {
        id: "nodus-sector-field-midnight",
        watch_id: "nodus-sector-field",
        color_name: "Midnight",
        image_url:
          "https://images.watchswipe.app/nodus-sector-field-midnight.jpg",
        hex_color: "#111827"
      }
    ]
  },
  {
    id: "farer-aqua-compressor",
    brand: "Farer",
    model: "Aqua Compressor",
    base_price: 1250,
    case_size: "41mm",
    movement: "Automatic",
    water_resistance: "300m",
    category: "Dive",
    description:
      "Colorful, dual-crown compressor-style diver with signature Farer palette.",
    brand_url: "https://farer.com",
    variants: [
      {
        id: "farer-aqua-lawn",
        watch_id: "farer-aqua-compressor",
        color_name: "Lawn Green",
        image_url:
          "https://images.watchswipe.app/farer-aqua-compressor-lawn.jpg",
        hex_color: "#2F855A"
      },
      {
        id: "farer-aqua-orange",
        watch_id: "farer-aqua-compressor",
        color_name: "Safety Orange",
        image_url:
          "https://images.watchswipe.app/farer-aqua-compressor-orange.jpg",
        hex_color: "#DD6B20"
      }
    ]
  },
  {
    id: "serica-4512",
    brand: "Serica",
    model: "4512 Field",
    base_price: 690,
    case_size: "37.7mm",
    movement: "Manual",
    water_resistance: "200m",
    category: "Field",
    description:
      "A refined field watch with sector dial options and a distinctive bracelet.",
    brand_url: "https://serica-watches.com",
    variants: [
      {
        id: "serica-4512-sand",
        watch_id: "serica-4512",
        color_name: "Sand Dial",
        image_url: "https://images.watchswipe.app/serica-4512-sand.jpg",
        hex_color: "#D9C3A3"
      },
      {
        id: "serica-4512-black",
        watch_id: "serica-4512",
        color_name: "Black California",
        image_url: "https://images.watchswipe.app/serica-4512-black.jpg",
        hex_color: "#111111"
      }
    ]
  },
  {
    id: "studio-underd0g-chronograph-02",
    brand: "Studio Underd0g",
    model: "Chronograph 02",
    base_price: 750,
    case_size: "38.5mm",
    movement: "Hand-wound Chronograph",
    water_resistance: "50m",
    category: "Chronograph",
    description:
      "Playful, gradient-heavy chronographs with a strong design point of view.",
    brand_url: "https://studiounderd0g.com",
    variants: [
      {
        id: "underdog-watermelon",
        watch_id: "studio-underd0g-chronograph-02",
        color_name: "Watermelon",
        image_url:
          "https://images.watchswipe.app/studio-underdog-watermelon.jpg",
        hex_color: "#F97373"
      },
      {
        id: "underdog-berry",
        watch_id: "studio-underd0g-chronograph-02",
        color_name: "Berry",
        image_url: "https://images.watchswipe.app/studio-underdog-berry.jpg",
        hex_color: "#BE123C"
      }
    ]
  },
  {
    id: "baltic-bicompax",
    brand: "Baltic",
    model: "Bicompax 003",
    base_price: 680,
    case_size: "36.5mm",
    movement: "Hand-wound Chronograph",
    water_resistance: "50m",
    category: "Chronograph",
    description:
      "A compact hand-wound chronograph with Breguet numerals and refined finishing.",
    brand_url: "https://baltic-watches.com",
    variants: [
      {
        id: "baltic-bicompax-salmon",
        watch_id: "baltic-bicompax",
        color_name: "Salmon",
        image_url:
          "https://images.watchswipe.app/baltic-bicompax-salmon.jpg",
        hex_color: "#F4A58A"
      },
      {
        id: "baltic-bicompax-ivory",
        watch_id: "baltic-bicompax",
        color_name: "Ivory",
        image_url:
          "https://images.watchswipe.app/baltic-bicompax-ivory.jpg",
        hex_color: "#F5E6D3"
      }
    ]
  },
  {
    id: "lorier-gmt",
    brand: "Lorier",
    model: "Hyperion GMT",
    base_price: 799,
    case_size: "39mm",
    movement: "Automatic GMT",
    water_resistance: "100m",
    category: "Pilot",
    description:
      "A compact traveler GMT with a classic 24-hour bezel and gilt accents.",
    brand_url: "https://lorierwatches.com",
    variants: [
      {
        id: "lorier-hyperion-pepsi",
        watch_id: "lorier-gmt",
        color_name: "Pepsi",
        image_url: "https://images.watchswipe.app/lorier-hyperion-pepsi.jpg",
        hex_color: "#1D4ED8"
      },
      {
        id: "lorier-hyperion-gilt-black",
        watch_id: "lorier-gmt",
        color_name: "Gilt Black",
        image_url:
          "https://images.watchswipe.app/lorier-hyperion-gilt-black.jpg",
        hex_color: "#111827"
      }
    ]
  },
  {
    id: "farer-lumen",
    brand: "Farer",
    model: "Lumen Series",
    base_price: 975,
    case_size: "39mm",
    movement: "Automatic",
    water_resistance: "100m",
    category: "Racing",
    description:
      "Lume-heavy racing chronographs with bold color blocking and Farer details.",
    brand_url: "https://farer.com",
    variants: [
      {
        id: "farer-lumen-aqua",
        watch_id: "farer-lumen",
        color_name: "Aqua",
        image_url: "https://images.watchswipe.app/farer-lumen-aqua.jpg",
        hex_color: "#22D3EE"
      },
      {
        id: "farer-lumen-neon",
        watch_id: "farer-lumen",
        color_name: "Neon",
        image_url: "https://images.watchswipe.app/farer-lumen-neon.jpg",
        hex_color: "#A855F7"
      }
    ]
  },
  {
    id: "nodus-contrail",
    brand: "Nodus",
    model: "Contrail",
    base_price: 675,
    case_size: "39.5mm",
    movement: "Automatic",
    water_resistance: "200m",
    category: "Pilot",
    description:
      "A modern pilot/diver hybrid with a 12-hour bezel and crisp dial.",
    brand_url: "https://noduswatches.com",
    variants: [
      {
        id: "nodus-contrail-mist",
        watch_id: "nodus-contrail",
        color_name: "Mist",
        image_url: "https://images.watchswipe.app/nodus-contrail-mist.jpg",
        hex_color: "#CBD5E1"
      },
      {
        id: "nodus-contrail-noir",
        watch_id: "nodus-contrail",
        color_name: "Noir",
        image_url: "https://images.watchswipe.app/nodus-contrail-noir.jpg",
        hex_color: "#020617"
      }
    ]
  },
  {
    id: "traska-seafarer",
    brand: "Traska",
    model: "Seafarer",
    base_price: 725,
    case_size: "38.5mm",
    movement: "Automatic",
    water_resistance: "120m",
    category: "Racing",
    description:
      "A colorful, compact sports watch designed as a go-anywhere companion.",
    brand_url: "https://traskawatch.com",
    variants: [
      {
        id: "traska-seafarer-reef",
        watch_id: "traska-seafarer",
        color_name: "Reef",
        image_url: "https://images.watchswipe.app/traska-seafarer-reef.jpg",
        hex_color: "#14B8A6"
      },
      {
        id: "traska-seafarer-dusk",
        watch_id: "traska-seafarer",
        color_name: "Dusk",
        image_url: "https://images.watchswipe.app/traska-seafarer-dusk.jpg",
        hex_color: "#FB7185"
      }
    ]
  }
];

