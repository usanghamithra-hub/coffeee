import { MenuItem, TastingRecord, AtelierGathering, SocietyReserveDrop } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'yemen-mokha',
    name: 'Yemen Mokha Pour-Over',
    badge: 'Private Reserve Lot',
    badgeType: 'signature',
    price: 9.00,
    category: 'slow-drip',
    description: 'Sourced from ancestral terraced slopes of Haraaz at 2,400 meters. Hand-brewed table-side using our copper V60 apparatus, yielding a complex cup with untamed wild honey and crushed cardamom undertones.',
    notes: ['Cardamom', 'Dark Honey', 'Blackcurrant'],
    specs: 'V60 Precision Ceremony • 93.5°C Pure Spring Extraction',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiVbv5rMJzrmG9OxJs5xpG8JOAONNod0vuSoyiwEz8zLxMcawbXkNcB9boAG0QunQ8B6Q3GhF-Y3xm0SNjVTAVnbc_daR_5wJ74NpGHXd6RaeXdvFsi78nrQWe57sg8uovLoiLzANtn3DIa9M9-dFGUFIdlKyl4L_atsc2NZ8Nurj5kxb5YBrQfBEhtegKAjYl4rv7YapSHBO04FlUEK8Ei0vXyiK91fW5mXvgY6Ze22VNTA8B48QO',
    featured: true,
    cuppingScore: 92.5,
    origin: 'Haraaz, Yemen (2,400m)',
    dietary: ['decaf']
  },
  {
    id: 'mayfair-flat-white',
    name: 'Mayfair Flat White',
    badge: 'Signature',
    badgeType: 'signature',
    price: 6.20,
    category: 'espresso',
    description: 'Double ristretto pulled into velvety steamed micro-textured dairy or custom barista oat emulsion. Sweet, dense, and immaculate.',
    notes: ['Hazelnut', 'Salted Caramel', 'Choice of Milk'],
    specs: '160ml • 1:1.8 Ratio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX4Z8pnkksOIvMR0awB86edxEdwj_SSWgFv-cWiKt80cQO0-hSRsSiOppOWvh0fd0MBIYFLwnj3pA3r_J98t07N0Yjbcq7zSqAdYnd4_Zh9WP5aL08YKVDyD04VF1yut6LfzTsDPtxyb-3J8wT9Cdbiv7IzRidXZoW9AfYXLwyCC3MqEQzwk13nQtf2ShNhDe7lEgDzJ5c03izxR-kZhnKNB_c6VY8pp8_TGWnb5j9grDnD5kdc2Cw',
    dietary: ['oat']
  },
  {
    id: 'smoked-vanilla-macchiato',
    name: 'Smoked Vanilla Macchiato',
    badge: 'House Special',
    badgeType: 'house',
    price: 6.80,
    category: 'espresso',
    description: 'House-reduced Madagascar bourbon vanilla bean syrup, espresso stained with frothed milk, infused with torched oak stave essence.',
    notes: ['Madagascar Bean', 'Smoked Oak', 'Subtle Sweet'],
    specs: '90ml • Stained',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPnh0_OgUo7fKFTDoW3iXM2lkU69fi9Z_q7v5-N7blFMQK19STtg5m7bmWm9zEioStGKM-ERoluj_2N2o-0qTgQPbCXTWf_8FmsfJ21AeJlEpW4TZzXpIoqaVYx-UE2LQ_ALOxqskgmnVIdmVA8o0_dCjSfQaUw_8s2srjRIkESNb1GOY-xVE1WifduZ_16UGTIwBvXHEcgmkP5tXbSrRyvREcS65QLHyx6GxFf2tdV3WdQChbtGeG',
    dietary: ['oat', 'sugar-free']
  },
  {
    id: 'kyoto-cold-drip',
    name: 'Kyoto Style Cold Drip',
    badge: '16hr Process',
    badgeType: 'process',
    price: 8.50,
    category: 'cold-brew',
    description: 'Slow cold extraction drip-by-drip through architectural blown-glass columns over sixteen patient hours. Whiskey-like body.',
    notes: ['Dark Cherry', 'Cognac Body', 'Dried Figs'],
    specs: 'Hand-Cut Ice Sphere • Single Origin',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0Q4krSnj30_HuDwaxNpEIczMId_P8H5UhzGSgE1ubvmJkpAweTsyK6yyUbSbe8gdRZd4FNop3Adp_BEEZ0c60E1v0NC4VsGiwGuAcZezZYxQkC3THBO_MqJY7QJhSAI5yMUHfu73sDdwKeMNOixSMoMsHDFJP6nKB26264iKXPGZlobST63t1jQbzaPRBwFfjgg3WI2s0MuYEcszMbQNcDCaPkZUZ3lPvlRHseLfHBQw8awsvw88',
    dietary: ['sugar-free']
  },
  {
    id: 'tweed-tonic-nitro',
    name: 'Tweed & Tonic Nitro',
    badge: 'Nitro Infused',
    badgeType: 'process',
    price: 7.80,
    category: 'cold-brew',
    description: 'Micro-nitrogenated single estate cold brew layered atop artisanal quinine tonic, crowned with a dehydrated blood orange disk.',
    notes: ['Cascading Head', 'Blood Orange', 'Effervescent'],
    specs: 'Guinness Draught Tap',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9pr005O8b7h3nbQkn_iqQwCeM5np5HL65E6FI1LBN21b2Qn-Jw-B5rHWDWVWT7E72RubSER0-G1_ZyBcPoEztvj00cYOHuKSGVTNacIVb6fmSslx7j_Ecu8mCWohEuXJY7mohyM1M_6Wp3OncrS4GPRugZElBFijVJwa6sJyKO6mCSFCN1N5w0jhNxgQgQWkdzjcF19juJgOq6nBaPg5R3Tj6l2_eSkxuue4OZy4yQ6PIQ-r0xJ1o',
    dietary: ['sugar-free']
  },
  {
    id: 'affogato-al-tartufo',
    name: 'Affogato al Tartufo',
    badge: 'Dessert Ritual',
    badgeType: 'dessert',
    price: 7.50,
    category: 'espresso',
    description: 'Tahitian vanilla pod gelato churned daily, drowned in a boiling double ristretto, finished with micro-planed 70% Venezuelan chocolate shavings.',
    notes: ['Tahitian Gelato', 'Double Ristretto', 'Venezuelan Cacao'],
    specs: 'Chilled Stemware Service',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi119hv7kXooM3SNTys3e2_sFmH38mKiBv4qymq00gB4bOjzat0EXkclDAqoMIaJlD6PuEIToQDX43PvMenpGxI0rzoWKoZOvHJG9TlN8Oof-E0XJl7pRcbdDitUMMp01yN4d-exdK7xB4TSKTFfZJSukhOpUkDZfpZ0-32ANsQwZ6dA9I-lYRKS4709b8uLMNc0Z60jsxe48hQOwRIBC3Hj-sKcGe_w4vvmTznqLiJWu6_PJSyu-j'
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat Gianduja',
    badge: 'Daily Bake',
    badgeType: 'daily',
    price: 5.50,
    category: 'pastries',
    description: 'Laminated with Normandy Isigny Ste Mère butter, folded with dual batons of roasted Piedmont hazelnut gianduja chocolate praline.',
    notes: ['Normandy Butter', 'Gianduja Praline', 'Warm from Oven'],
    specs: 'Baked Fresh at 6:30am',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCZkNosWEocOML8i2ynjJWt_1VoNn-H05hnOk5rwC8RSPsgaehcwrCiqVotXXtCz4Ycedi_utO9rdpWg5agDoDirFaD9m2201pmgusZnQbpUMDCtD5I2oY5Jc_nvHDQTt34Nc7uqI3qnI0eJzhvGbMEKQKGhmN0PUU0Z_jKV4KcELbOl_fRW_f0d0f0NNSCX7DQbbWei2evMsrpDUhWs75lUGpb5BNE1_r2k0BXEeNJsR78dLgUEic'
  },
  {
    id: 'truffled-egg-prosciutto',
    name: 'Truffled Egg & Prosciutto',
    badge: 'Chef Special',
    badgeType: 'chef',
    price: 12.00,
    category: 'pastries',
    description: 'Slow-scrambled organic Burford Brown eggs, Perigord winter truffle butter, paper-thin 24-month San Daniele prosciutto on toasted brioche.',
    notes: ['Winter Truffle', 'San Daniele', 'Burford Browns'],
    specs: 'Savory Atelier Kitchen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXUDi-esc_Frok7QXABU6A0BsQZZI6f0zVVl1yiYg65daKqVF7TuCJ9jLYtuXB1xcGvS0dt1hac_R2yL2dxXw-ZhI8VjxYCC4wcJA9QLQ4fR7R60L9sjQWcMVWZ0CLU2oDhO8xKLJMOkQ02iq52CBzjqds_UYMhsUkJIbAp3Gc-0I5ziocNKpfetFBWgYmYu6exVV4LahNA19-0Vo4AlhXdQrYJacQiCZGE8ZWO_g1bCor2FReZI5H'
  },
  {
    id: 'imperial-silver-needle',
    name: 'Imperial Silver Needle',
    badge: 'Fujian Spring',
    badgeType: 'origin',
    price: 7.20,
    category: 'tea',
    description: 'Single-bud white tea harvested during the first vernal equinox. Silky mouthfeel with delicate notes of white melon, honey blossom, and wild sage.',
    notes: ['Wild Melon', 'Honey Blossom', 'Low Tannin'],
    specs: 'Gaiwan 3-Steep Service',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx5-p8QC7xtq6cTJjM878d1MeysOYfIEX0XFCjVEQ9kJBPsSbUcFUqrqinWEgJb1Z-12zJFuf318CoHDu6_TMqUohsBImmbpBepyW0q1gSdhpoqGWgza4NaitP3gNi7ol1gnM7sWaIkvlV-dg7YlqwkL-9DMGjL3CxkWyX1qChYxzJ4IVQeG5rDZDchbDg58MKn6xlyjvrsU-s6R1XC5XHHL0fqpfMofhSK-FjBnotpfZycLZ6wdxN',
    dietary: ['sugar-free']
  },
  {
    id: 'panama-geisha-chemex',
    name: 'Panama Geisha Chemex',
    badge: 'Panama Boquete',
    badgeType: 'origin',
    price: 11.50,
    category: 'slow-drip',
    description: 'The crown jewel of Boquete Highlands. Hand-filtered through thick bonded paper for ethereal clarity, tea-like lightness, and fragrant bergamot finish.',
    notes: ['Meyer Lemon', 'Jasmine', 'Bergamot Oil'],
    specs: 'Bonded Paper Pour',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALNHmjB51sxjwe7Rs4tSwMWyoXGPB72WqWtUOpLE3b8dVBmHhN3AyVgQaSiWQiLfVZtjpPVcmEyg-VHtsOYQxQrmqTZ5o-TZGBWvbdRVrAs8D9DVWJzHZP_EPKOPK1DlUkJuPmBqRHu8CUfUq7XQPFlKjmVEnGJ8bYMk6Mme9nX6DQq7yR3cuVTSh-K_HFC0y6uTGSERxoiNP5Pp5MbXaZGxNV2Iih1Q-t_8xotYeqrDxscuO_1JAw',
    dietary: ['sugar-free']
  }
];

export const DAILY_ROASTS = [
  {
    id: 'sovereign-espresso',
    name: 'The Sovereign Espresso',
    price: 6.50,
    type: 'Double Ristretto',
    strength: 5,
    description: 'Double ristretto extraction displaying a dense, velvet crema. Rich and commanding profile with resonant notes of dried pipe tobacco, dark cocoa truffle, and black currant.',
    notes: ['Pipe Tobacco', 'Dark Truffle', 'Heavy Crema'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXgG_gU_SCiLyr4xYCkLvoImyQcRFXGyk_XmFaje0rECVAMGXvOH9DrKPOoGchTn72U111ISmJXK8bb5kq2VHhvKi7GoPdrqyqPKL1LKQcbsfyASOtiil_5B_a7tNo8XfKpfQ7FOCDR_OCwRLjkXaB4bTER0SCx3KGqGIg2na16DNOl7Bj47APNlYgCQ4yPYYUDHHD5gev1pHKR9ntk6egduwG7bjnpFsJ1b71oC3rdIiJzVQ4IPnp'
  },
  {
    id: 'bourbon-cask-cold-drip',
    name: 'Bourbon Cask Cold Drip',
    price: 8.50,
    type: '18-Hour Barrel Drip',
    badge: 'Signature Reserve',
    strength: 4,
    description: '18-hour single-drop slow cold extraction aged in charred white American oak bourbon casks. Nuances of spiced vanilla, smoked leather, and mellow butterscotch.',
    notes: ['Vanilla Bean', 'Charred Oak', 'Bourbon Spirit'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgY-8QXMruSwu5pD0SJS19PHXZBsCaIiMjecfgBfN3Y3Dz2t8qTj0GVVgr8YtDnmuocwt-JIOAXqueORKeuIAtvN-w_NiTU2VHQbHCH82xjv7cw4WIsT4GAB0GnDEWRW9T6WOXRFJjaHS8NZfqfRiEwbW6CXBR5aaNrN24huZIiteGsnzR6EoAHdtJsKpJRqH0I1oYPOUZcEe7j5KDFvv99FAs3f7vfcWaagAKZ13dXxz1PRHl6chl'
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    price: 6.00,
    type: 'Geisha Base + Jersey Milk',
    strength: 3,
    description: 'Micro-foamed steamed pure Jersey milk poured delicately over a washed Colombian Geisha foundation. Creamy caramel sweetness, light peach blossom, and hazelnut silk.',
    notes: ['Toasted Hazelnut', 'Jersey Cream', 'Peach Blossom'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7ktEaeFESHb4O2XbCiuA35dKex-DrqaxVpCmK1Vw4ft0PQwwl_0IPWUVbpr3LKxOJ_rPcmHKxHZ7mw3iSmbCa2xWpTA7WGcOBDgHYn7RLVfxGldIaweaEYv0ASq8zYqDQO2aIkOPH6WXh3ryp204YaLIkoFrLpo6n2q2aXlgdi6_N55cyCRHCutRfPUtmquYz4XjBArWPR9j4hCN3tXvPQOzfZxPBINXmmyCGBoqdKB7clOU4baUu'
  }
];

export const TASTING_RECORDS_INIT: TastingRecord[] = [
  {
    id: 'tast-1',
    coffeeName: 'Sumatra Mandheling Vintage 2021',
    tag: 'Aged Barrel',
    curatedProfile: 'Earthy cedar wood, aged pipe tobacco, rich molasses finish with velvety body.',
    dateStr: 'Tasted Nov 2 at Mayfair Hearth',
    rating: 5,
    ratingLabel: 'Flawless 5.0'
  },
  {
    id: 'tast-2',
    coffeeName: 'Kenya Nyeri Peaberry',
    tag: 'Single Origin',
    curatedProfile: 'Succulent blackcurrant, bright citric lime acidity, delicate floral honeysuckle.',
    dateStr: 'Tasted Oct 26 • Cellar Flight',
    rating: 4,
    ratingLabel: 'Distinguished 4.0'
  }
];

export const ATELIER_GATHERINGS: AtelierGathering[] = [
  {
    id: 'gath-1',
    type: 'Masterclass Flight',
    title: 'The Art of Slow Pour-Over with Arthur Vance',
    dateStr: 'Fri, Nov 14',
    timeStr: '18:00 GMT',
    statusText: '2 Seats Confirmed',
    location: 'Private Tasting Salon 2'
  },
  {
    id: 'gath-2',
    type: 'Table Reservation',
    title: 'Private Cellar Table Reservation',
    dateStr: 'Sunday',
    timeStr: '11:30 AM GMT',
    statusText: '4 Guests Confirmed',
    location: 'Table VII (Leather Library)'
  }
];

export const SOCIETY_RESERVE_DROPS: SocietyReserveDrop[] = [
  {
    id: 'bourbon-yemeni-mokha',
    name: 'Bourbon-Infused Yemeni Mokha',
    price: 64.00,
    elevation: '2,200m',
    remainingTins: 40,
    limitPerPatron: 2,
    description: 'Cultivated in ancient terrace orchards at 2,200m. Finished for 60 days inside charred Kentucky oak casks. Notes of spiced plum, dark cacao, and charred vanilla.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrR4mNSXckLbhkZivXCKZhme058Lb_wz3nYCMu-xuf9N-tZB3hd7f6Dxd_LBqC5H63p9u1ZppNKc6nMh7BJwGnT3W4yGW6P1g0i6CAIlvoPpXcAA8aV4MkyZY40VkjXFPBwirMsZSuQONKI-6nRtCnKsWLmMmlmEp8zmhPNCfjXsIYwI4rk-0-NjsoeS-PuUD62FqnVT850D7k_9jFo1B3EhP7l7hLQG_p_hdzP_lq_UqDn-tC8-B-'
  }
];

export const INITIAL_CART = [
  {
    id: 'cart-1',
    menuItemId: 'kyoto-cold-drip',
    name: 'Kyoto Style Cold Drip',
    price: 8.50,
    quantity: 1,
    optionSummary: 'Aged Oak Rested • Zero Sugar • 18h Gravity Draught'
  },
  {
    id: 'cart-2',
    menuItemId: 'mayfair-flat-white',
    name: 'Mayfair Flat White',
    price: 6.20,
    quantity: 2,
    optionSummary: 'Double Ristretto • Barista Oat • Silk Microfoam'
  },
  {
    id: 'cart-3',
    menuItemId: 'truffled-egg-prosciutto',
    name: 'Truffled Egg & Prosciutto Brioche',
    price: 12.00,
    quantity: 1,
    optionSummary: 'Lightly Warmed • Salted Jersey Butter'
  },
  {
    id: 'cart-4',
    menuItemId: 'yirgacheffe-tin',
    name: '250g Whole Bean Yirgacheffe',
    price: 16.00,
    quantity: 1,
    optionSummary: 'Heirloom Lot #04 • Nitrogen Flushed Sealed Tin'
  }
];
