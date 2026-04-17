// Real image URLs — all from Unsplash (free commercial license) or Wikipedia Commons
// These load from the browser, not during build

export const IMAGES = {
  // Venues — Unsplash free license
  hero:           'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400&q=85',
  stadium:        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80',
  cricketNets:    'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
  cricketBat:     'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=80',
  cricketBall:    'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&q=80',
  training:       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  cricket1:       'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80',
  cricket2:       'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80',
  cricket3:       'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=800&q=80',
  dubaiSkyline:   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
  shop:           'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  
  // Wikipedia Commons — UAE cricket venues (public domain / free license)
  sharjahStadium: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sharjah_Cricket_Stadium.jpg/1280px-Sharjah_Cricket_Stadium.jpg',
  dubaiIntl:      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dubai_International_Cricket_Stadium.jpg/1280px-Dubai_International_Cricket_Stadium.jpg',
  iccAcademy:     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/ICC_Academy_Dubai.jpg/1280px-ICC_Academy_Dubai.jpg',
  
  // Academy placeholders via DiceBear (free avatars API)
  academyICC:     'https://api.dicebear.com/7.x/initials/svg?seed=ICC&backgroundColor=EF3340&textColor=ffffff',
  academyGForce:  'https://api.dicebear.com/7.x/initials/svg?seed=GF&backgroundColor=009A44&textColor=ffffff',
}

// Player avatar generator — creates professional colored initials
export function playerAvatar(initials: string, color = '#EF3340') {
  const encoded = encodeURIComponent(color.replace('#', ''))
  return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=${encoded}&textColor=ffffff&fontSize=38&fontWeight=700`
}

// Academy image map
export const ACADEMY_IMAGES: Record<string, string> = {
  'ICC Cricket Academy':           IMAGES.dubaiIntl,
  'G Force Cricket Academy':       IMAGES.stadium,
  'MS Dhoni Cricket Academy':      IMAGES.cricketNets,
  'Rajasthan Royals Academy UAE':  IMAGES.training,
  'Young Talents Cricket Academy': IMAGES.cricket1,
  'Danube Cricket Academy':        IMAGES.cricketBat,
  'Set Go Cricket Academy':        IMAGES.cricket2,
  'Maxtalent Cricket Academy':     IMAGES.cricket3,
  'Abu Dhabi Cricket':             IMAGES.dubaiSkyline,
  'Sharjah Cricket Stadium Nets':  IMAGES.sharjahStadium,
}
