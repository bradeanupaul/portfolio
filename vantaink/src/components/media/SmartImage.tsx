"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageShared = {
  src: string;
  alt: string;
  pending?: boolean;
  pendingLabel?: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
};

type SmartImageFillProps = SmartImageShared &
  Omit<ImageProps, "src" | "alt" | "onError" | "fill"> & {
    fill: true;
  };

type SmartImageSizedProps = SmartImageShared &
  Omit<ImageProps, "src" | "alt" | "onError" | "fill" | "width" | "height"> & {
    fill?: false;
    width: number;
    height: number;
  };

export type SmartImageProps = SmartImageFillProps | SmartImageSizedProps;

export function SmartImage(props: SmartImageProps) {
  const {
    src,
    alt,
    pending = false,
    pendingLabel = "Imagine în curs",
    className,
    imageClassName,
    objectPosition,
    ...imageProps
  } = props;

  const [failed, setFailed] = useState(false);
  const showPlaceholder = pending || failed || !src;

  const onError = useCallback(() => {
    setFailed(true);
  }, []);

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "media-placeholder relative flex items-end overflow-hidden border border-line bg-surface-muted",
          "fill" in imageProps && imageProps.fill && "absolute inset-0 h-full w-full",
          className,
        )}
        role="img"
        aria-label={pendingLabel}
      >
        <span className="font-mono-ui m-4 text-xs uppercase tracking-widest text-text-subtle">
          {pendingLabel}
        </span>
      </div>
    );
  }

  const style = objectPosition ? { objectPosition } : undefined;

  if ("fill" in imageProps && imageProps.fill) {
    // Parent must establish size (aspect-ratio / explicit height). Wrapper fills it —
    // a bare `relative` wrapper collapses when the only child is position:absolute.
    return (
      <div
        className={cn(
          "absolute inset-0 h-full w-full overflow-hidden",
          className,
        )}
      >
        <Image
          {...imageProps}
          src={src}
          alt={alt}
          fill
          onError={onError}
          className={cn("object-cover", imageClassName)}
          style={style}
        />
      </div>
    );
  }

  const sized = imageProps as Omit<SmartImageSizedProps, keyof SmartImageShared>;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...sized}
        src={src}
        alt={alt}
        onError={onError}
        className={cn("h-auto w-full object-cover", imageClassName)}
        style={style}
      />
    </div>
  );
}