// Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export const acceptedContentType = [
  'image/bmp',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/vnd.microsoft.icon',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'application/pdf',
] as const;

export type AcceptedContentType = typeof acceptedContentType[number];
