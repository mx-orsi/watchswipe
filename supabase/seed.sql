-- Seed data for WatchSwipe

insert into public.watches (id, brand, model, base_price, case_size, movement, water_resistance, category, description, brand_url)
values
  ('baltic-aquascaphe', 'Baltic', 'Aquascaphe', 750, '39mm', 'Automatic', '200m', 'Dive', 'A modern take on a classic skin diver with a slim profile and vintage-inspired details.', 'https://baltic-watches.com'),
  ('lorier-neptune', 'Lorier', 'Neptune', 499, '39mm', 'Automatic', '200m', 'Dive', 'A compact, gilt-accented diver with strong vintage cues and daily-wear versatility.', 'https://lorierwatches.com'),
  ('traska-commuter', 'Traska', 'Commuter', 635, '36mm', 'Automatic', '100m', 'Field', 'A compact daily-wearer with hardened steel and subtle sunburst dials.', 'https://traskawatch.com'),
  ('zelos-mako', 'Zelos', 'Mako', 449, '40mm', 'Automatic', '300m', 'Dive', 'A bold diver with textured dials, strong lume, and premium materials at an accessible price.', 'https://zeloswatches.com'),
  ('nodus-sector-field', 'Nodus', 'Sector Field', 575, '38mm', 'Automatic', '150m', 'Field', 'A modern field watch with a sector dial layout and sharp finishing.', 'https://noduswatches.com'),
  ('farer-aqua-compressor', 'Farer', 'Aqua Compressor', 1250, '41mm', 'Automatic', '300m', 'Dive', 'Colorful, dual-crown compressor-style diver with signature Farer palette.', 'https://farer.com'),
  ('serica-4512', 'Serica', '4512 Field', 690, '37.7mm', 'Manual', '200m', 'Field', 'A refined field watch with sector dial options and a distinctive bracelet.', 'https://serica-watches.com'),
  ('studio-underd0g-chronograph-02', 'Studio Underd0g', 'Chronograph 02', 750, '38.5mm', 'Hand-wound Chronograph', '50m', 'Chronograph', 'Playful, gradient-heavy chronographs with a strong design point of view.', 'https://studiounderd0g.com'),
  ('baltic-bicompax', 'Baltic', 'Bicompax 003', 680, '36.5mm', 'Hand-wound Chronograph', '50m', 'Chronograph', 'A compact hand-wound chronograph with Breguet numerals and refined finishing.', 'https://baltic-watches.com'),
  ('lorier-gmt', 'Lorier', 'Hyperion GMT', 799, '39mm', 'Automatic GMT', '100m', 'Pilot', 'A compact traveler GMT with a classic 24-hour bezel and gilt accents.', 'https://lorierwatches.com'),
  ('farer-lumen', 'Farer', 'Lumen Series', 975, '39mm', 'Automatic', '100m', 'Racing', 'Lume-heavy racing chronographs with bold color blocking and Farer details.', 'https://farer.com'),
  ('nodus-contrail', 'Nodus', 'Contrail', 675, '39.5mm', 'Automatic', '200m', 'Pilot', 'A modern pilot/diver hybrid with a 12-hour bezel and crisp dial.', 'https://noduswatches.com'),
  ('traska-seafarer', 'Traska', 'Seafarer', 725, '38.5mm', 'Automatic', '120m', 'Racing', 'A colorful, compact sports watch designed as a go-anywhere companion.', 'https://traskawatch.com')
on conflict (id) do nothing;

insert into public.watch_variants (id, watch_id, color_name, image_url, hex_color)
values
  ('baltic-aquascaphe-blue', 'baltic-aquascaphe', 'Deep Blue', 'https://images.watchswipe.app/baltic-aquascaphe-deep-blue.jpg', '#0E294B'),
  ('baltic-aquascaphe-black', 'baltic-aquascaphe', 'Black', 'https://images.watchswipe.app/baltic-aquascaphe-black.jpg', '#111111'),
  ('baltic-aquascaphe-green', 'baltic-aquascaphe', 'Green', 'https://images.watchswipe.app/baltic-aquascaphe-green.jpg', '#073B3A'),

  ('lorier-neptune-gilt-black', 'lorier-neptune', 'Gilt Black', 'https://images.watchswipe.app/lorier-neptune-gilt-black.jpg', '#1A1613'),
  ('lorier-neptune-blue', 'lorier-neptune', 'Navy', 'https://images.watchswipe.app/lorier-neptune-navy.jpg', '#12213F'),

  ('traska-commuter-mint', 'traska-commuter', 'Mint Green', 'https://images.watchswipe.app/traska-commuter-mint.jpg', '#9FE2BF'),
  ('traska-commuter-smoke', 'traska-commuter', 'Charcoal', 'https://images.watchswipe.app/traska-commuter-smoke.jpg', '#303339'),
  ('traska-commuter-salmon', 'traska-commuter', 'Salmon', 'https://images.watchswipe.app/traska-commuter-salmon.jpg', '#F2A28F'),

  ('zelos-mako-teal', 'zelos-mako', 'Teal', 'https://images.watchswipe.app/zelos-mako-teal.jpg', '#0F766E'),
  ('zelos-mako-sand', 'zelos-mako', 'Sand', 'https://images.watchswipe.app/zelos-mako-sand.jpg', '#C7A17A'),

  ('nodus-sector-field-cream', 'nodus-sector-field', 'Cream', 'https://images.watchswipe.app/nodus-sector-field-cream.jpg', '#F5E7CF'),
  ('nodus-sector-field-midnight', 'nodus-sector-field', 'Midnight', 'https://images.watchswipe.app/nodus-sector-field-midnight.jpg', '#111827'),

  ('farer-aqua-lawn', 'farer-aqua-compressor', 'Lawn Green', 'https://images.watchswipe.app/farer-aqua-compressor-lawn.jpg', '#2F855A'),
  ('farer-aqua-orange', 'farer-aqua-compressor', 'Safety Orange', 'https://images.watchswipe.app/farer-aqua-compressor-orange.jpg', '#DD6B20'),

  ('serica-4512-sand', 'serica-4512', 'Sand Dial', 'https://images.watchswipe.app/serica-4512-sand.jpg', '#D9C3A3'),
  ('serica-4512-black', 'serica-4512', 'Black California', 'https://images.watchswipe.app/serica-4512-black.jpg', '#111111'),

  ('underdog-watermelon', 'studio-underd0g-chronograph-02', 'Watermelon', 'https://images.watchswipe.app/studio-underdog-watermelon.jpg', '#F97373'),
  ('underdog-berry', 'studio-underd0g-chronograph-02', 'Berry', 'https://images.watchswipe.app/studio-underd0g-berry.jpg', '#BE123C'),

  ('baltic-bicompax-salmon', 'baltic-bicompax', 'Salmon', 'https://images.watchswipe.app/baltic-bicompax-salmon.jpg', '#F4A58A'),
  ('baltic-bicompax-ivory', 'baltic-bicompax', 'Ivory', 'https://images.watchswipe.app/baltic-bicompax-ivory.jpg', '#F5E6D3'),

  ('lorier-hyperion-pepsi', 'lorier-gmt', 'Pepsi', 'https://images.watchswipe.app/lorier-hyperion-pepsi.jpg', '#1D4ED8'),
  ('lorier-hyperion-gilt-black', 'lorier-gmt', 'Gilt Black', 'https://images.watchswipe.app/lorier-hyperion-gilt-black.jpg', '#111827'),

  ('farer-lumen-aqua', 'farer-lumen', 'Aqua', 'https://images.watchswipe.app/farer-lumen-aqua.jpg', '#22D3EE'),
  ('farer-lumen-neon', 'farer-lumen', 'Neon', 'https://images.watchswipe.app/farer-lumen-neon.jpg', '#A855F7'),

  ('nodus-contrail-mist', 'nodus-contrail', 'Mist', 'https://images.watchswipe.app/nodus-contrail-mist.jpg', '#CBD5E1'),
  ('nodus-contrail-noir', 'nodus-contrail', 'Noir', 'https://images.watchswipe.app/nodus-contrail-noir.jpg', '#020617'),

  ('traska-seafarer-reef', 'traska-seafarer', 'Reef', 'https://images.watchswipe.app/traska-seafarer-reef.jpg', '#14B8A6'),
  ('traska-seafarer-dusk', 'traska-seafarer', 'Dusk', 'https://images.watchswipe.app/traska-seafarer-dusk.jpg', '#FB7185')
on conflict (id) do nothing;

-- saved_watches is intentionally left empty for production. You can insert
-- sample rows here for local testing if desired.

