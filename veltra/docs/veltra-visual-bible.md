# VELTRA Visual Bible

Extracted from approved hero, facilities, rooms and lodge explorer assets currently in the repo.

## Property identity

- Fictional alpine hideaway in Valea Cerbului Alb, Romanian Carpathians
- Contemporary timber-and-stone lodge, charcoal multi-gable metal roof
- Dark bronze / dark metal window frames, expansive glazing
- Warm amber evening lighting, honey oak interiors, cream linens, stone accents
- Deep green conifers, natural rock, restrained landscaping

## Palette (live CSS tokens)

| Token | Value | Use |
| --- | --- | --- |
| `--ivory` | `#f3ebe1` | Light sections, page ground |
| `--forest-ink` | `#1b2a25` | Deep pine sections |
| `--ink` | `#252b28` | Body text on ivory |
| `--clay` | `#b77758` | Copper accents / CTA |
| `--sand` | `#e7bf92` | Soft copper / dark-section accents |

Do not introduce purple gradients, bright gold, pure white card systems, or glassmorphism.

## Typography

- Headings: Cormorant Garamond (serif)
- Body / UI: Manrope (sans)
- Occasional italic copper emphasis on a single word in major headlines only

## Photography rules

- Same lodge architecture whenever exterior is visible
- Editorial hospitality photography, natural focal lengths, believable materials
- No full-bleed low-res photographic section backgrounds
- Prefer framed editorial crops with crisp square corners; facilities may keep approved diagonal clips
- No rounded image cards as the dominant language

## Canonical references

- Exterior: `/images/exterior/lodge-studio.webp`, `/images/exterior/hero-golden-hour.jpg`
- Facilities: `/images/facilities/pool-dusk.jpg`, `hot-tub-evening.jpg`, `bbq-dining.jpg`
- Rooms: `/images/rooms/*-primary.jpg`
- Floor explorer frames: `/media/veltra-floor-explorer/frames/`

## Motion DNA

- Each major homepage section uses a different choreography
- Preserve hero, facilities, rooms photo-stack, floor explorer behaviors
- Always support `prefers-reduced-motion`
