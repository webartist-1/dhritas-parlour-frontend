
export const toAbsoluteUrl = (pathname: string) => {
    // Check if the path contains '/media', if so, extract it
    const mediaIndex = pathname.indexOf('/media');
    if (mediaIndex !== -1) {
      return import.meta.env.VITE_PUBLIC_URL + pathname.slice(mediaIndex);
    }
    return import.meta.env.VITE_PUBLIC_URL + pathname; // fallback if '/media' not found
  };
  