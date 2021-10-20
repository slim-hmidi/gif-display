export interface TrendingGifParams {
    limit: number;
    offset: number;
    rating?: string;
    bundle?: string;
    [x: string]: any;
  }

export interface SearchGifParams {
    q?: string;
    limit: number;
    offset: number;
    rating?: string;
    bundle?: string;
    lang?: string;
    [x: string]: any;
  }

export interface GifResponse {
  type: string,
  id: string,
  url: string,
  slug: string,
  bitlyGifUrl: string,
  bitlyUrl: string,
  embedUrl: string,
  username: string,
  source: string,
  title: string,
  rating: string,
  contentUrl: string,
  sourceTld: string,
  sourcePostUrl: string,
  isSticker: string,
  importDatetime: string,
  trendingDatetime: string,
  images: {
    original: Record<string, any>[],
    fixedHeight: Record<string, any>[],
    fixedHeightDownsampled: Record<string, any>[],
    fixedHeightSmall: Record<string, any>[],
    fixedWidth: Record<string, any>[],
    fixedWidthDownsampled: Record<string, any>[],
    fixedWidthSmall: Record<string, any>[]
  },
  user: {
    avatarUrl: string,
    bannerImage: string,
    bannerUrl: string,
    profileUrl: string,
    username: string,
    displayName: string,
    description: string,
    instagramUrl: string,
    websiteUrl: string,
    isVerified: true
  },
  analyticsResponsePayload: string,
  analytics: { onload: Record<string, any>[], onclick: Record<string, any>[], onsent: Record<string, any>[]}
}

interface FormattedGifData {
    id: string;
    title: string;
    fixedHeightImage: Record<string, any> ;
    originalImage: Record<string, any>
}
export interface ApiResponse {
  totalCount: number;
  data: FormattedGifData[]
}
