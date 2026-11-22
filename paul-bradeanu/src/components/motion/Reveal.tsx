"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { scrollWindowToTop } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/utils";

type RevealVariant =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "pop"
  | "maskUp"
  | "fade";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number | "some" | "all";
  as?: "div" | "span" | "li" | "article" | "section";
};

const presets: Record<
  RevealVariant,
  { hidden: Record<string, number | string>; show: Record<string, number | string> }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -22, filter: "blur(4px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 22, filter: "blur(4px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.72, y: 12 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  maskUp: {
    hidden: { opacity: 0, y: 24, clipPath: "inset(18% 0 0 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

const viewOpts = {
  once: true as const,
  amount: 0.35 as const,
  margin: "0px 0px -12% 0px" as const,
};

/* ── Same-row cascade: left → right when peers enter together ── */

const ROW_TOLERANCE_PX = 56;
const ROW_STAGGER_S = 0.09;

type CascadeClaim = {
  top: number;
  left: number;
  resolve: (extraDelay: number) => void;
};

let cascadeBatch: CascadeClaim[] = [];
let cascadeFlush: number | null = null;

function flushCascadeBatch() {
  cascadeFlush = null;
  const batch = cascadeBatch;
  cascadeBatch = [];
  if (batch.length === 0) return;

  const rows: CascadeClaim[][] = [];
  for (const item of batch) {
    const row = rows.find((r) => Math.abs(r[0].top - item.top) <= ROW_TOLERANCE_PX);
    if (row) row.push(item);
    else rows.push([item]);
  }

  for (const row of rows) {
    row.sort((a, b) => a.left - b.left || a.top - b.top);
    row.forEach((item, index) => {
      item.resolve(index * ROW_STAGGER_S);
    });
  }
}

/** Queue a reveal; peers on the same visual row get staggered delays. */
function claimRowCascadeDelay(el: HTMLElement): Promise<number> {
  const rect = el.getBoundingClientRect();
  return new Promise((resolve) => {
    cascadeBatch.push({
      top: rect.top + rect.height * 0.35,
      left: rect.left,
      resolve,
    });
    if (cascadeFlush != null) window.clearTimeout(cascadeFlush);
    cascadeFlush = window.setTimeout(flushCascadeBatch, 24);
  });
}

function useRowCascadeDelay(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  const [extra, setExtra] = useState(0);
  const [armed, setArmed] = useState(false);
  const claimed = useRef(false);

  useEffect(() => {
    if (!active || claimed.current) return;
    const el = ref.current;
    if (!el) {
      setArmed(true);
      return;
    }
    claimed.current = true;
    let cancelled = false;
    claimRowCascadeDelay(el).then((delay) => {
      if (cancelled) return;
      setExtra(delay);
      setArmed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [active, ref]);

  useEffect(() => {
    if (!active) {
      claimed.current = false;
      setArmed(false);
      setExtra(0);
    }
  }, [active]);

  return { armed: !active || armed, extra };
}

const MotionReadyContext = createContext(false);

/**
 * Arms scroll reveals only after route change + scroll reset.
 * Prevents off-screen items from firing while the previous page's
 * scroll position is still applied during navigation.
 */
export function MotionReadyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setReady(false);

    if (!window.location.hash) {
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      scrollWindowToTop();
      html.style.scrollBehavior = previous;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    }, 60);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <MotionReadyContext.Provider value={ready}>
      {children}
    </MotionReadyContext.Provider>
  );
}

export function useMotionReady() {
  return useContext(MotionReadyContext);
}

function itemVariants(variant: RevealVariant): Variants {
  const preset = presets[variant];
  return {
    hidden: preset.hidden,
    show: preset.show,
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  once = true,
  amount = 0.35,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ready = useMotionReady();
  const MotionTag = motion[as];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { ...viewOpts, once, amount });
  const show = ready && inView;
  const { armed, extra } = useRowCascadeDelay(ref, show);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const preset = presets[variant];
  const visible = show && armed;

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      initial={preset.hidden}
      animate={visible ? preset.show : preset.hidden}
      transition={{ duration: 0.55, delay: delay + extra, ease }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  itemVariant?: RevealVariant;
  itemClassName?: string;
  wrap?: boolean;
  as?: "div" | "ul" | "ol";
};

export function Stagger({
  children,
  className,
  stagger = 0.06,
  delay = 0.04,
  itemVariant = "fadeUp",
  itemClassName,
  wrap = true,
  as = "div",
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);
  const Tag = as;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (wrap) {
    return (
      <Tag className={cn(className)}>
        {items.map((child, index) => (
          <RevealItem
            key={index}
            variant={itemVariant}
            delay={delay + index * stagger}
            className={cn("min-w-0", itemClassName)}
          >
            {child}
          </RevealItem>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)}>
      {items.map((child, index) => {
        if (isValidElement(child) && child.type === RevealItem) {
          const el = child as ReactElement<{ delay?: number }>;
          return cloneElement(el, {
            delay: (el.props.delay ?? 0) + delay + index * stagger,
          });
        }
        return child;
      })}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  variant = "fadeUp",
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: "div" | "span" | "li" | "p" | "h1" | "h2" | "h3" | "h4";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ready = useMotionReady();
  const MotionTag = motion[as];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, viewOpts);
  const show = ready && inView;
  const { armed, extra } = useRowCascadeDelay(ref, show);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const visible = show && armed;

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      variants={itemVariants(variant)}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      transition={{ duration: 0.55, delay: delay + extra, ease }}
    >
      {children}
    </MotionTag>
  );
}

export { itemVariants };
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.02 },
  },
};
export const staggerItem = itemVariants("fadeUp");
