/*
  # Seed Products Data

  1. Insert sample products
    - Solar panels, power banks, lighting equipment
    - Realistic specifications and features
    - Proper categorization and pricing
*/

-- Insert sample products
INSERT INTO products (
  name, description, short_description, price, original_price, images, category,
  in_stock, stock_quantity, features, specifications, rating, review_count
) VALUES
(
  'DuneVolt Explorer 100W Solar Panel',
  'Our flagship portable solar panel designed for serious outdoor enthusiasts. The Explorer 100W features military-grade construction with weatherproof coating, making it perfect for desert expeditions and extended camping trips. With high-efficiency monocrystalline cells, it delivers reliable power even in challenging conditions.',
  'Military-grade 100W portable solar panel for serious adventurers',
  299.00,
  349.00,
  ARRAY[
    'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/9875453/pexels-photo-9875453.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Solar Panels',
  true,
  25,
  ARRAY[
    'Military-grade weatherproof construction',
    'High-efficiency monocrystalline cells',
    'Foldable design for easy transport',
    'Multiple device charging ports',
    'Desert-tested durability'
  ],
  '{
    "Power Output": "100W",
    "Cell Type": "Monocrystalline",
    "Dimensions (Folded)": "24\" x 20\" x 2\"",
    "Weight": "8.5 lbs",
    "Water Resistance": "IP65",
    "Operating Temperature": "-10°C to 65°C"
  }'::jsonb,
  4.8,
  127
),
(
  'DesertForce Power Bank 25000mAh',
  'The ultimate rugged power bank built to withstand extreme desert conditions. With massive 25000mAh capacity and solar charging capability, the DesertForce keeps your devices powered for days. Features wireless charging, multiple USB ports, and an unbreakable shock-resistant design.',
  'Rugged 25000mAh solar power bank with wireless charging',
  149.00,
  NULL,
  ARRAY[
    'https://images.pexels.com/photos/4316/black-and-white-car-vehicle-vintage.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Power Banks',
  true,
  40,
  ARRAY[
    'Massive 25000mAh capacity',
    'Built-in solar charging panel',
    'Wireless charging pad',
    'Shock and dust resistant',
    'LED flashlight with SOS mode'
  ],
  '{
    "Capacity": "25000mAh",
    "Solar Input": "5W",
    "USB Output": "3x USB-A, 1x USB-C",
    "Wireless Output": "10W",
    "Dimensions": "7\" x 3.5\" x 1.2\"",
    "Weight": "1.8 lbs"
  }'::jsonb,
  4.6,
  89
),
(
  'SolarFlare Camping Lantern Pro',
  'Illuminate your campsite with the power of the sun. The SolarFlare Pro combines bright LED lighting with solar charging and power bank functionality. Perfect for extended camping trips where reliable lighting is essential. Features multiple brightness modes and emergency signaling.',
  'Solar-powered LED camping lantern with power bank function',
  79.00,
  99.00,
  ARRAY[
    'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Lighting',
  true,
  60,
  ARRAY[
    'Ultra-bright 360° LED illumination',
    'Solar charging with backup USB charging',
    'Power bank for device charging',
    'Multiple brightness modes',
    'Emergency SOS strobe function'
  ],
  '{
    "Brightness": "1000 lumens",
    "Battery": "10000mAh",
    "Solar Panel": "3W",
    "Runtime": "48+ hours on low",
    "Water Rating": "IPX6",
    "Dimensions": "6\" x 4\" diameter"
  }'::jsonb,
  4.7,
  156
),
(
  'DuneVolt Compact 50W Solar Panel',
  'Perfect for day trips and light camping, the Compact 50W offers excellent portability without sacrificing power. Ideal for charging smaller devices and maintaining power banks. Features smart charging technology and weather-resistant design.',
  'Lightweight 50W solar panel for day trips and light camping',
  179.00,
  NULL,
  ARRAY[
    'https://images.pexels.com/photos/9875468/pexels-photo-9875468.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Solar Panels',
  true,
  35,
  ARRAY[
    'Lightweight and portable design',
    'Smart charging technology',
    'Weather-resistant coating',
    'Integrated kickstand',
    'Multiple device compatibility'
  ],
  '{
    "Power Output": "50W",
    "Weight": "4.2 lbs",
    "Dimensions": "20\" x 16\" x 1\"",
    "Efficiency": "22%",
    "Ports": "2x USB-A, 1x USB-C",
    "Temperature Range": "-20°C to 70°C"
  }'::jsonb,
  4.5,
  73
),
(
  'RockSolid Headlamp Solar Edition',
  'Never run out of light with our solar-charging headlamp. Perfect for early morning hikes, late-night camp activities, or emergency situations. Features gesture control, red night vision mode, and all-day solar charging capability.',
  'Solar-charging headlamp with gesture control and night vision',
  59.00,
  NULL,
  ARRAY[
    'https://images.pexels.com/photos/1687835/pexels-photo-1687835.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Lighting',
  true,
  80,
  ARRAY[
    'Solar charging capability',
    'Gesture control activation',
    'Red night vision mode',
    'Waterproof design',
    'Adjustable brightness levels'
  ],
  '{
    "Brightness": "500 lumens",
    "Battery Life": "20+ hours",
    "Charging": "Solar + USB-C",
    "Water Rating": "IPX7",
    "Weight": "3.2 oz",
    "Beam Distance": "150 meters"
  }'::jsonb,
  4.4,
  92
),
(
  'DuneVolt Power Station 500Wh',
  'The ultimate portable power solution for extended off-grid adventures. With 500Wh capacity and multiple output options, this power station can run small appliances, charge multiple devices, and provide emergency backup power. Built-in solar charging controller optimizes power collection.',
  'Portable 500Wh power station with solar charging capability',
  599.00,
  699.00,
  ARRAY[
    'https://images.pexels.com/photos/163064/play-stone-the-dome-human-163064.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Power Stations',
  true,
  15,
  ARRAY[
    'Massive 500Wh capacity',
    'Multiple AC, DC, and USB outputs',
    'Built-in solar charge controller',
    'LCD display with power monitoring',
    'Pure sine wave inverter'
  ],
  '{
    "Capacity": "500Wh (135000mAh)",
    "AC Output": "2x 300W outlets",
    "DC Output": "4x 12V ports",
    "USB Output": "4x USB-A, 2x USB-C PD",
    "Solar Input": "Up to 200W",
    "Weight": "13.2 lbs"
  }'::jsonb,
  4.9,
  234
);