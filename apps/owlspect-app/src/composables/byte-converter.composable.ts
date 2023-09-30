/**
 * composable for converting bytes.
 */
export const useByteConverter = () => {
  const formatBytes = (bytes: number) => {
    if (!+bytes) return "0 Bytes";

    const DECIMAL_NUMBERS = 1;

    const k = 1024;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(DECIMAL_NUMBERS))} ${
      sizes[i]
    }`;
  };

  return {
    formatBytes,
  };
};
