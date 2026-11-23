"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getClip, type VideoClipId } from "@/content/video-scenes";
import { storyChapters, type StoryChapterId } from "@/data/story";
import { chapterPoster } from "@/lib/images";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ActiveMedia =
  | { kind: "video"; src: string; poster: string }
  | { kind: "still"; src: string };

function resolveClip(clipId: string): ActiveMedia {
  const clip = getClip(clipId as VideoClipId);
  if (clip.kind === "video") {
    return {
      kind: "video",
      src: clip.src,
      poster: clip.poster ?? chapterPoster("intro"),
    };
  }
  return { kind: "still", src: clip.src };
}

function mediaForChapter(chapterId: StoryChapterId, clipIndex = 0): ActiveMedia {
  const chapter = storyChapters.find((c) => c.id === chapterId);
  const ids = chapter?.clipIds ?? [];
  const clipId = ids[Math.min(clipIndex, Math.max(0, ids.length - 1))];
  if (!clipId) return { kind: "still", src: chapterPoster(chapterId) };
  return resolveClip(clipId);
}

export function CinematicStory() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [clipIndex, setClipIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setReduced(mqReduce.matches);
      setIsDesktop(mqDesktop.matches);
    };
    sync();
    mqReduce.addEventListener("change", sync);
    mqDesktop.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqDesktop.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced || !isDesktop || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>("[data-story-chapter]");
      chapters.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActive(index);
            setClipIndex(0);
          },
          onEnterBack: () => {
            setActive(index);
            setClipIndex(0);
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, isDesktop]);

  const activeChapter = storyChapters[active] ?? storyChapters[0];
  const clipCount = activeChapter.clipIds.length;
  const activeMedia = useMemo(
    () => mediaForChapter(activeChapter.id, clipIndex),
    [activeChapter.id, clipIndex],
  );

  // Advance through clips inside a chapter when the current video ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video || activeMedia.kind !== "video") return;

    const onEnded = () => {
      setClipIndex((prev) => {
        if (clipCount <= 1) return 0;
        return (prev + 1) % clipCount;
      });
    };

    video.addEventListener("ended", onEnded);
    void video.play().catch(() => undefined);
    return () => video.removeEventListener("ended", onEnded);
  }, [activeMedia, clipCount]);

  return (
    <section ref={rootRef} className="band-carbon section-pad" aria-labelledby="story-title">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow tone="light">KERN Visual Experience</SectionEyebrow>
          <h2 id="story-title" className="font-display text-3xl font-semibold text-off-white md:text-5xl">
            Mașina rămâne în cadru. Serviciile se schimbă.
          </h2>
          <p className="mt-4 text-base leading-7 text-silver md:text-lg">
            Șapte capitole leagă protecția caroseriei, ceramica, corecția lacului, geamurile, jantele
            și interiorul de materialele video reale. Pe desktop, panoul alb rămâne sticky; pe mobil,
            fiecare capitol are propriul cadru compact.
          </p>
        </div>

        {!reduced && isDesktop ? (
          <div className="mt-14 grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] gap-10 xl:gap-16">
            <div>
              {storyChapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  data-story-chapter
                  className="flex min-h-[80vh] flex-col justify-center py-14"
                >
                  <div
                    className={cn(
                      "mb-5 h-px w-16 origin-left bg-copper transition-transform duration-500",
                      index === active ? "scale-x-100" : "scale-x-50 opacity-40",
                    )}
                  />
                  <p className="font-mono-label text-copper">
                    {String(index + 1).padStart(2, "0")} / {String(storyChapters.length).padStart(2, "0")} ·{" "}
                    {chapter.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold text-off-white xl:text-4xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-7 text-silver">{chapter.body}</p>
                  <ul className="mt-6 space-y-3">
                    {chapter.benefits.map((b, i) => (
                      <li
                        key={b}
                        className={cn(
                          "flex gap-3 text-sm text-off-white/85 transition-opacity duration-500",
                          index === active ? "opacity-100" : "opacity-60",
                        )}
                        style={{ transitionDelay: index === active ? `${i * 90}ms` : "0ms" }}
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={chapter.ctaHref}
                    className="mt-8 inline-flex text-sm font-semibold text-copper hover:text-white"
                  >
                    {chapter.ctaLabel} →
                  </Link>
                </article>
              ))}
            </div>

            <div className="sticky top-[5.5rem] flex h-[calc(100vh-6.5rem)] items-center self-start">
              <div className="w-full max-w-[560px]">
                <div className="relative aspect-square w-full overflow-hidden rounded-[16px] border border-[#d8dde2] bg-white p-3 shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
                  <div className="absolute left-5 top-5 z-10 rounded-sm bg-white/90 px-2 py-1 font-mono-label text-[10px] tracking-[0.18em] text-graphite">
                    KERN VISUAL EXPERIENCE
                  </div>
                  <div className="absolute right-5 top-5 z-10 font-mono-label text-[10px] text-slate">
                    {String(active + 1).padStart(2, "0")} / {String(storyChapters.length).padStart(2, "0")}
                  </div>
                  <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#f7f8f7]">
                    {activeMedia.kind === "video" ? (
                      <video
                        ref={videoRef}
                        key={activeMedia.src}
                        className="h-full w-full object-contain"
                        src={activeMedia.src}
                        poster={activeMedia.poster}
                        muted
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={activeMedia.src}
                        src={activeMedia.src}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                </div>
                <p className="font-mono-label mt-4 text-center text-slate">
                  {activeChapter.legend}
                  {clipCount > 1 ? ` · clip ${clipIndex + 1}/${clipCount}` : null}
                </p>
                <div className="mt-4 flex justify-center gap-2" aria-hidden>
                  {storyChapters.map((c, i) => (
                    <span
                      key={c.id}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === active ? "w-7 bg-copper" : "w-1.5 bg-white/25",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 space-y-10">
            {storyChapters.map((chapter, index) => {
              const media = mediaForChapter(chapter.id, 0);
              const src =
                media.kind === "video" ? media.poster : media.src;
              return (
                <article
                  key={chapter.id}
                  className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-2 md:items-center"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[14px] border border-white/80 bg-white p-2 md:aspect-square">
                    {media.kind === "video" && !reduced ? (
                      <video
                        className="h-full w-full object-contain"
                        src={media.src}
                        poster={media.poster}
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="none"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="h-full w-full object-contain" />
                    )}
                  </div>
                  <div>
                    <p className="font-mono-label text-copper">
                      {String(index + 1).padStart(2, "0")} · {chapter.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-off-white">
                      {chapter.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-silver">{chapter.body}</p>
                    <ul className="mt-4 space-y-2">
                      {chapter.benefits.slice(0, 2).map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-off-white/80">
                          <span className="mt-2 h-1 w-1 rounded-full bg-copper" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={chapter.ctaHref}
                      className="mt-5 inline-flex text-sm font-semibold text-copper"
                    >
                      {chapter.ctaLabel} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
